<script lang="ts">
  import { onMount } from 'svelte';
  let { data } = $props();

  let productDetail = data.data;
  interface Image {
    src: string;
    alt: string;
  }

  // You can receive images as props if needed
  let images: Image[] = [
    { src: 'https://bleame.vercel.app//assets/images/product.webp', alt: '1' },
    { src: 'https://bleame.vercel.app//assets/images/product-1.webp', alt: '1' },
    { src: 'https://bleame.vercel.app//assets/images/product-2.webp', alt: '2' },
    { src: 'https://bleame.vercel.app//assets/images/product-3.webp', alt: '3' },
    { src: 'https://bleame.vercel.app//assets/images/product-4.webp', alt: '4' },
    { src: 'https://bleame.vercel.app//assets/images/product-5.webp', alt: '1' },
    { src: 'https://bleame.vercel.app//assets/images/product-6.webp', alt: '2' },
    { src: 'https://bleame.vercel.app//assets/images/product-7.webp', alt: '3' },
    { src: 'https://bleame.vercel.app//assets/images/product-8.webp', alt: '4' }
  ];

  let currentIndex = 0;
  let imageContainer: HTMLDivElement;
  let thumbnails: HTMLDivElement;
  let lightBox: HTMLDivElement;
  let lightBoxMainImg: HTMLImageElement;
  let isLightBoxOpen = false;
  let mainImages: HTMLImageElement[] = [];
  let imgThumbnails: HTMLImageElement[] = [];
  let containerSliderOffset = 0;

  function updateSlider(index: number): void {
    const imageWidth = mainImages[0]?.clientWidth || 0;
    imageContainer?.scrollTo({ left: index * imageWidth, behavior: 'smooth' });

    imgThumbnails.forEach((thumb) => thumb.classList.remove('active'));
    if (imgThumbnails[index]) {
      imgThumbnails[index].classList.add('active');
    }

    const leftSpacing =
      (imgThumbnails[index]?.offsetLeft || 0) -
      containerSliderOffset -
      (thumbnails?.clientWidth || 0) / 2 +
      (imgThumbnails[index]?.clientWidth || 0) / 2;

    thumbnails?.scrollTo({ left: leftSpacing, behavior: 'smooth' });
  }

  function updateLightBoxImage(index: number): void {
    if (lightBoxMainImg) {
      const imgSrc = images[index]?.src || '';
      lightBoxMainImg.src = imgSrc;
    }
  }

  function handleMainImageClick(event: MouseEvent, index: number) {
    const target = event.currentTarget as HTMLImageElement;
    const { left, width } = target.getBoundingClientRect();
    const mouseX = event.clientX - left;

    currentIndex =
      mouseX < width / 2
        ? Math.max(0, currentIndex - 1)
        : Math.min(mainImages.length - 1, currentIndex + 1);

    updateSlider(currentIndex);
  }

  function handleMainImageMouseMove(event: MouseEvent, index: number) {
    const target = event.currentTarget as HTMLImageElement;
    const { left, width } = target.getBoundingClientRect();
    const mouseX = event.clientX - left;

    target.classList.remove('left-cursor', 'right-cursor');
    target.classList.add(mouseX < width / 2 ? 'left-cursor' : 'right-cursor');
  }

  function openLightBox() {
    updateLightBoxImage(currentIndex);
    isLightBoxOpen = true;
  }

  function closeLightBox() {
    isLightBoxOpen = false;
  }
  function previousImage() {
    if (currentIndex > 0) {
      currentIndex--;
      updateLightBoxImage(currentIndex);
    }
  }

  function nextImage() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateLightBoxImage(currentIndex);
    }
  }

  function handleThumbnailClick(index: number) {
    currentIndex = index;
    updateSlider(currentIndex);
  }

  onMount(() => {
    // Get all the elements after the component is mounted
    mainImages = Array.from(document.querySelectorAll('.main-image'));
    imgThumbnails = Array.from(document.querySelectorAll('.thumbnail'));
    const containerSlider = document.querySelector('.container-slide');
    containerSliderOffset = containerSlider?.offsetLeft || 0;

    currentIndex = 0;
    updateSlider(currentIndex);
  });

  let arr: string[] = $state(Array(productDetail.options.length));
  let currentVariant = $state(null);
  let currentPrice = $state(productDetail.price);
  let selectedOptions = $state([]);

  onMount(() => {
    selectedOptions = productDetail.options.map((option) => option.values[0]?.id || null);

    updateCurrentVariant();
  });

  $effect(() => {
    updateCurrentVariant();
  });

  function updateCurrentVariant() {
    if (!selectedOptions || selectedOptions.every((opt) => opt === null)) {
      currentVariant = null;
      currentPrice = productDetail.price;
      return;
    }

    const selectedOptionsMap = {};
    productDetail.options.forEach((option, index) => {
      selectedOptionsMap[option.id] = selectedOptions[index];
    });

    for (const variant of productDetail.variants) {
      // So sánh từng option trong variant với options đã chọn
      let allMatch = true;
      for (const variantOption of variant.options) {
        const optionId = variantOption.option_id;
        const valueId = variantOption.value_id;
        const selectedValueForThisOption = selectedOptionsMap[optionId];

        if (selectedValueForThisOption !== valueId) {
          allMatch = false;
          break;
        }
      }

      if (allMatch) {
        currentVariant = variant;
        currentPrice = variant.price;
        return;
      }
    }

    currentVariant = null;
    currentPrice = productDetail.price;
  }

  function handleOptionChange(index, value) {
    selectedOptions[index] = value;
    updateCurrentVariant();
  }

  function handleAddToCart() {
    if (!currentVariant) {
      alert('Vui lòng chọn đầy đủ các tùy chọn sản phẩm');
      return;
    }
    const selectedOptionsText = productDetail.options
      .map((option, index) => {
        const selectedValue = option.values.find((value) => value.id === selectedOptions[index]);
        return `${selectedValue?.value || ''}`;
      })
      .join(' ');

    const productToAdd = {
      id: currentVariant.id,
      title: productDetail.title,
      oldPrice: currentVariant.compare_at_price || productDetail.compare_at_price,
      price: currentVariant.price,
      options: selectedOptionsText,
      quantity: 1,
      image: images[0]?.src || '',
      sku: currentVariant.sku || ''
    };

    let cart = [];
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
    } catch (e) {
      cart = [];
    }

    const existingProductIndex = cart.findIndex((item) => item.id === productToAdd.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(productToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    window.dispatchEvent(new CustomEvent('productAddedToCart'));

    if (typeof window.updateCart === 'function') {
      window.updateCart();
    }
  }
</script>

<div class="container-page product-container !mt-[140px]">
  <section class="product-detail">
    <div class="product-media">
      <div class="container-slide">
        <div class="slider" id="slider">
          <div class="btn-zoom" on:click={openLightBox}>
            <img src="https://bleame.vercel.app/assets/images/loupe.png" alt="" />
          </div>
          <div class="image-container" bind:this={imageContainer}>
            {#each images as image, i}
              <img
                class="main-image"
                src={image.src}
                alt={image.alt}
                on:click={(e) => handleMainImageClick(e, i)}
                on:mousemove={(e) => handleMainImageMouseMove(e, i)}
              />
            {/each}
          </div>
        </div>
        <div class="thumbnails" bind:this={thumbnails}>
          {#each images as image, i}
            <div class="wrapper-thumbnail">
              <img
                class="thumbnail {i === 0 ? 'active' : ''}"
                src={image.src}
                alt={image.alt}
                on:click={() => handleThumbnailClick(i)}
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="product-content">
      <div class="topContent">
        <div class="rate">
          <div class="list-star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <span>Excellent 4.8 | 1319 reviews</span>
        </div>
        <div class="title">{productDetail.title}</div>
        <p>NEW: 🏆 2025 Rated Hair Removal Innovation</p>
        <div class="price_meta_list">
          <div class="price_list">
            {#if currentVariant?.compare_at_price > currentVariant?.price}
              <span class="compare-price">${currentVariant.compare_at_price}</span>
            {:else}
              <span class="compare-price">${productDetail.compare_at_price}</span>
            {/if}
            <span class="price">${currentPrice}</span>
            <!-- <span>${productDetail.price}</span> -->
          </div>
          <div class="meta">
            <span>SAVE 48%</span>
          </div>
        </div>
      </div>
      <div class="product-form">
        <hr />
        <div class="product-form__text">
          <p>
            <strong>{productDetail.description}</strong>
          </p>
        </div>
        <div class="product-form__iconic">
          <div>👙 Perfect for the bikini area</div>
          <div>🍑 Enjoy silky smooth skin</div>
          <div>🌸 Eliminate ingrown hairs</div>
          <div>🍓 No more strawberry legs</div>
          <div>✨ Pain-free, safe & gentle</div>
          <div>😌 Gently exfoliates dead skin cell</div>
        </div>
        <div class="block-swatch-list">
          {#each productDetail.options as option, idx}
            <div class="product-option-container">
              <label class="product-option">
                <div class="radio-btn"></div>
                <div class="product-image">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0609/1531/8959/files/pack1.png?v=1713997682"
                    alt="Product Image"
                  />
                </div>
                <div class="product-title">{option.name}</div>
              </label>

              <div class="relative mt-2">
                <select
                  bind:value={selectedOptions[idx]}
                  on:change={() => handleOptionChange(idx, selectedOptions[idx])}
                  class="w-full appearance-none rounded-md border border-gray-300 bg-[#f5f2ff] px-4 py-2 pr-8 leading-tight text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {#each option.values as value}
                    <option value={value.id}>{value.value}</option>
                  {/each}
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          {/each}
        </div>
        <div class="stock-date">
          <div class="circle-pulse"></div>
          <div class="stock-text">
            <p><strong>Body Scrub</strong> included for the next</p>
            &nbsp;<span id="stock-number" class="stock-number" data-order="137">1</span>&nbsp;
            <p>orders!</p>
          </div>
        </div>
        <button class="addToCart" on:click={handleAddToCart}>
          <span> CLAIM OFFER </span>
        </button>
        <div class="paymentList">
          <img
            loading="lazy"
            src="https://bleame.vercel.app/assets/images/payment-list.webp"
            alt=""
          />
        </div>
        <div class="date-time-wrapper">
          <div class="date_time_main">
            Want it by<b> Wednesday, 5 Mar</b>
            ?

            <div class="date-time-detail">
              ORDER WITHIN
              <div id="timer"><b>1 HOURS 53 MINUTES</b></div>
            </div>
          </div>
        </div>
        <div class="pro-iwt-wrap">
          <div class="innr">
            <div class="inner-icon">
              <img
                loading="lazy"
                src="//bleame.com/cdn/shop/files/Free_Shipping_60x.png?v=1714562074"
                width="404"
                height="404"
              />
            </div>
            <p>Free Shipping from US</p>
          </div>

          <div class="innr">
            <div class="inner-icon">
              <img
                loading="lazy"
                src="//bleame.com/cdn/shop/files/30_Nights_Trial_60x.png?v=1714562082"
                width="405"
                height="404"
              />
            </div>
            <p>30-Day-Guarantee</p>
          </div>
        </div>
        <hr />
      </div>
      <div class="arcodion">
        <div class="arcodion-item">
          <div class="title">
            <h1>Where can I use Bleame?</h1>
            <div class="plus">
              <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="" />
            </div>
          </div>
          <div class="promt">
            You can use your Bleame on just about any part of your body below the cheeks, including
            the bikini area and face! Its completely safe to use!
          </div>
        </div>
        <div class="arcodion-item">
          <div class="title">
            <h1>How does it work?</h1>
            <div class="plus">
              <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="" />
            </div>
          </div>
          <div class="promt">
            Using Nano-Crystalline technology, Bleame™ Crystal Hair Eraser allows the hair to clump
            and break from the surface when rubbed gently on the skin. This process also helps
            exfoliate, revealing baby smooth skin after use 💜
          </div>
        </div>
        <div class="arcodion-item">
          <div class="title">
            <h1>Does it help against strawberry skin & bumps?</h1>
            <div class="plus">
              <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="" />
            </div>
          </div>
          <div class="promt">
            Absolutely! Bleame effectively improves the appearance of strawberry skin and razor
            bumps, which are commonly caused by waxing and shaving.
          </div>
        </div>
        <div class="arcodion-item">
          <div class="title">
            <h1>Shipping & Delivery</h1>
            <div class="plus">
              <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="" />
            </div>
          </div>
          <div class="promt">
            Shipping Information: We process orders within 1-2 business days from our US warehouse.
            After dispatch, the estimated delivery time varies based on the shipping method you
            choose, generally taking up to 2 days.
          </div>
        </div>
        <div class="arcodion-item">
          <div class="title">
            <h1>Return & Refund Policy</h1>
            <div class="plus">
              <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="" />
            </div>
          </div>
          <div class="promt">
            Our commitment to your satisfaction is evident in our products, backed by a 30-Day 100%
            Money Back Guarantee. We are pleased to inform you that we even include a refund for
            shipping charges. If, after this initial period, you find yourself not fully satisfied,
            we will initiate a refund for the entire amount you paid. For returns, please email us
            at hello@bleame.com
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
<div
  class="lightBox {isLightBoxOpen ? 'openLightBox' : ''}"
  bind:this={lightBox}
  on:click|self={closeLightBox}
>
  <div class="wrapper-lighBox">
    <div class="btn-lightBox btn-left" on:click|stopPropagation={previousImage}>
      <img src="https://bleame.vercel.app/assets/images/back-16px.png" alt="Previous" />
    </div>
    <div class="lightBox-main-img" on:click|stopPropagation>
      <img bind:this={lightBoxMainImg} src={images[0]?.src || ''} alt="Lightbox Image" />
    </div>
    <div class="btn-lightBox btn-right" on:click|stopPropagation={nextImage}>
      <img src="https://bleame.vercel.app/assets/images/next-16px.png" alt="Next" />
    </div>
    <div class="close-lightBox" on:click|stopPropagation={closeLightBox}>
      <img src="https://bleame.vercel.app/assets/images/close.png" alt="Close" />
    </div>
  </div>
</div>

<style>
</style>
