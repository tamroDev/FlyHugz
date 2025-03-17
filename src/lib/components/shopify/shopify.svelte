<script lang="ts">
  import { onMount } from 'svelte';
  import Swiper from 'swiper';
  import { Autoplay } from 'swiper/modules';
  import 'swiper/css';

  const mediaArray = [
    { type: "image", src: "https://bleame.vercel.app/assets/images/shopify-1.webp" },
    { type: "video", src: "https://bleame.vercel.app/assets/images/shopify-2.mp4" },
    { type: "image", src: "https://bleame.vercel.app/assets/images/shopify-3.webp" },
    { type: "image", src: "https://bleame.vercel.app/assets/images/shopify-7.webp" },
    { type: "video", src: "https://bleame.vercel.app/assets/images/shopify-4.mp4" },
    { type: "video", src: "https://bleame.vercel.app/assets/images/shopify-5.mp4" },
    { type: "video", src: "https://bleame.vercel.app/assets/images/shopify-6.mp4" }
  ];

  let swiper: Swiper;

  onMount(() => {
    // Khởi tạo Swiper
    swiper = new Swiper('.swiper', {
      modules: [Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      speed: 5000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
    });

    // Đảm bảo tất cả video đều đang chạy
    const videos = document.querySelectorAll('.swiper-slide video');
    videos.forEach(video => {
      if (video instanceof HTMLVideoElement) {
        video.play().catch(err => console.error('Video play failed:', err));
      }
    });
  });
</script>

<div class="wrapper-shopify">
  <div class="container-page shopify-container">
    <section class="shopify-section">
      <div class="text_shopify">
        <h1>Look At How Others Are Loving Their Bleame</h1>
        <p>Real Reviews From Real People</p>
        <button class="addToCart btn_shopify">
          <span> CLAIM OFFER </span>
        </button>
        <div class="rate rate_shopify" style="justify-content: center">
          <div class="list-star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <span>Rated 4.8/5 by 1,319+ Happy Customers</span>
        </div>
      </div>

      <div class="slider-container swiper">
        <div class="swiper-wrapper">
          {#each mediaArray as media}
            <div class="swiper-slide slide">
              {#if media.type === "image"}
                <img loading="lazy" src={media.src} alt="Shopify media" />
              {:else if media.type === "video"}
                <video autoplay loop muted playsinline preload="none" src={media.src}></video>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  /* Shopify */
  .wrapper-shopify {
    padding-block-start: 40px;
    padding-block-end: 40px;
  }

  .shopify-container {
    width: 100%;
  }

  .shopify-section {
    display: flex;
    align-items: center;
  }

  .text_shopify {
    flex: 1;
    text-align: center;
    padding: 50px;
  }

  .text_shopify h1 {
    font-size: 36px;
    margin-bottom: 15px;
    letter-spacing: -0.8px;
    color: var(--primary-color);
    line-height: var(--second-lineHeight);
  }

  .text_shopify p {
    margin-bottom: 15px;
    line-height: var(--primary-lineHeight);
    font-weight: lighter;
  }

  .rate_shopify {
    margin-top: 20px;
  }

  .btn_shopify {
    height: 52px !important;
  }

  .slider-container {
    height: 500px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex: 1;
  }

  .slide {
    width: 300px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slide img,
  .slide video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  /* Để tránh đè CSS của Swiper */
  :global(.swiper) {
    overflow: hidden;
  }

  :global(.swiper-wrapper) {
    display: flex;
    transition-timing-function: linear !important;
  }

  @media (max-width: 768px) {
    .shopify-section {
      flex-direction: column;
    }

    .text_shopify, .slider-container {
      flex: none;
      width: 100%;
    }

    .text_shopify {
      padding: 20px;
    }

    .slider-container {
      height: 400px;
    }
  }
</style>