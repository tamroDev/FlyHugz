<script lang="ts">
  import { onMount } from 'svelte';
  import { MinusIcon, PlusIcon } from 'lucide-svelte';
  import Arcodion from '$lib/components/arcodion/arcodion.svelte';
  import { TabAction } from '$lib/components/tabAction/index.js';
  import Shopify from '$lib/components/shopify/shopify.svelte';
  import Compare from '$lib/components/compare/compare.svelte';
  import Future from '$lib/components/future/future.svelte';
  import LastContent from '$lib/components/lastContent/lastContent.svelte';
  import Report from '$lib/components/report/report.svelte';
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

<div class="wrapper-notifacion mb-6">
  <section class="notifacion">
    <div>
      <img loading="lazy" src="https://bleame.vercel.app/assets/images/truck-icon.png" alt="" />
      <p>Free Shipping Today</p>
    </div>
    <div>
      <img loading="lazy" src="https://bleame.vercel.app/assets/images/hearth-icon.png" alt="" />
      <p>175,000+ Happy Babes</p>
    </div>
  </section>
</div>
<div class="container-page product-container">
  <section class="product-detail">
    <div class="product-media">
      <div class="container-slide">
        <div class="slider" id="slider">
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
          </div>
          <div class="meta">
            {#if currentVariant?.compare_at_price > currentVariant?.price}
              <span
                >SAVE {Math.round(
                  ((currentVariant.compare_at_price - currentVariant.price) /
                    currentVariant.compare_at_price) *
                    100
                )}%</span
              >
            {:else if productDetail.compare_at_price > currentPrice}
              <span
                >SAVE {Math.round(
                  ((productDetail.compare_at_price - currentPrice) /
                    productDetail.compare_at_price) *
                    100
                )}%</span
              >
            {/if}
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
        <div class="block-swatch-list !flex">
          {#each productDetail.options as option, idx}
            <div class="group relative">
              <select
                bind:value={selectedOptions[idx]}
                on:change={() => handleOptionChange(idx, selectedOptions[idx])}
                class="w-56 appearance-none rounded-md bg-gradient-to-r from-[#a99dda] to-[#8577bc] px-4 py-1 text-lg font-medium text-white shadow-lg outline-none ring-1 ring-[#a99dda] transition-all duration-200 hover:shadow-xl focus:ring-2 focus:ring-[#8577bc7b]"
                style="
                  /* Custom styling for dropdown */
                  background-image: linear-gradient(to right, #a99dda, #b5aae0);
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                "
              >
                {#each option.values as value}
                  <option
                    class="text-primary bg-white px-2 py-3 text-xs font-bold capitalize"
                    value={value.id}
                    style="
                      /* Custom styling for options */
                      background-color: #ffffff;
                      color: #444;
                      font-weight: 600;
                      padding: 12px 16px;
                      border-bottom: 1px solid #f0f0f0;
                      transition: background-color 0.2s ease;
                      text-transform: capitalize;
                      letter-spacing: 0.5px;
                    "
                  >
                    {value.value}
                  </option>
                {/each}
              </select>
              <div
                class="pointer-events-none absolute right-0 top-0 h-full w-12 translate-x-0 rounded-r-md bg-[#a99dda] bg-opacity-70 transition-all duration-300 group-hover:bg-opacity-100"
              >
                <div class="flex h-full w-full items-center justify-center">
                  <PlusIcon
                    color="#fff"
                    size={20}
                    class="transition-transform duration-300 group-hover:scale-110"
                  />
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
      <Arcodion />
    </div>
  </section>
  <Shopify />
  <TabAction />
  <Compare />
  <Future />
  <LastContent />
  <Report />
</div>


<style>
  /* Global styles for improving select options appearance */
  select option:hover,
  select option:focus,
  select option:active,
  select option:checked {
    background: linear-gradient(to right, #f3f0ff, #e9e2ff) !important;
    color: #6143b9 !important;
    font-weight: 700 !important;
  }

  select:focus {
    border-color: #9a8bd0;
  }

  /* This makes the scrollbar in the dropdown prettier */
  select {
    scrollbar-width: thin;
    scrollbar-color: #a99dda #f3f0ff;
  }

  select::-webkit-scrollbar {
    width: 8px;
  }

  select::-webkit-scrollbar-track {
    background: #f3f0ff;
  }

  select::-webkit-scrollbar-thumb {
    background-color: #a99dda;
    border-radius: 20px;
    border: 2px solid #f3f0ff;
  }

  :global(.main-image.left-cursor) {
    cursor: url('https://bleame.vercel.app/assets/images/back-16px.png'), auto;
  }

  :global(.main-image.right-cursor) {
    cursor: url('https://bleame.vercel.app/assets/images/next-16px.png'), auto;
  }


  /* Shopify */
  .wrapper-notifacion {
  height: 43px;
  background-color: #2e2a39;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notifacion {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: max-content;
}

.notifacion div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.notifacion div img {
  width: 20px;
  height: 20px;
}

.notifacion div p {
  color: white;
  font-weight: 700;
  line-height: 26px;
  text-align: center;
  text-wrap-mode: nowrap;
}

/* Shopify */


</style>
