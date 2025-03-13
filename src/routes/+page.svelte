<script lang="ts">
  import { Button } from '$lib/components/button';
  import { onMount, onDestroy } from 'svelte';
  import ProductItem from '$lib/components/productItem/productItem.svelte';
  import SlideVideo from '$lib/components/slide/slide_video.svelte';
  import type { IProduct } from '$lib/schemes/product.type';
  import type { ISlide } from '$lib/schemes/slide.type';
  import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-svelte';
  let { data } = $props<{
    products: IProduct[];
    slides: ISlide[];
    error?: string;
  }>();
  let container: HTMLDivElement;
  let scrollX = $state(0);
  let speed = 0.5;
  let animationFrame: number;

  const startAutoScroll = () => {
    const scroll = () => {
      if (container) {
        scrollX += speed;
        if (scrollX >= container.scrollWidth / 2) {
          scrollX = 0;
        }
        container.scrollLeft = scrollX;
      }
      animationFrame = requestAnimationFrame(scroll);
    };
    animationFrame = requestAnimationFrame(scroll);
  };

  onMount(() => {
    startAutoScroll();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      cancelAnimationFrame(animationFrame);
    }
  });

  const logos = [
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/download-10-1680808457465.png?v=1680808460',
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/download-11-1680808560674.png?v=1680808563',
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/download-12-1680808619052.png?v=1680808622',
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/usatodayseeklogocom_240x240-1680809579493.webp?v=1680809582',
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/nbc002_logo_vertical_bw_1nbc002_logo_vertical_bw_120x120-1680809625857.webp?v=1680809628',
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/hp_logo_120x120-1680809768302.webp?v=1680809771',
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/theatlanticmagazineseeklogocom_240x240-1680809664789.webp?v=1680809667',
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/lat_logo_240x240-1680809750707.webp?v=1680809753',
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/usweeklymagazine_1usweeklymagazine_120x120-1680809648809.webp?v=1680809651',
    'https://cdn.shopify.com/s/files/1/0749/0053/7654/t/2/assets/futurism_240x240-2-1680809936179.avif?v=1680809938'
  ];
</script>

<div>
  <div class="bg-[#ebe6e2]">
    <div class="container-page flex flex-col items-center justify-center gap-4 py-14">
      <img
        class="max-w-[300px]"
        src="https://cdn.shopify.com/s/files/1/0818/3060/9177/files/0a7c39e06aca460d8994d199a18d0595.png?v=1712147018"
        alt=""
      />
      <h1 class="text-title text-3xl font-bold">Arrive Relaxed & Refreshed.</h1>
      <p class="text-primary text-[15px] tracking-wider">
        Experience your journeys in a new light with our premium FlyHugz® neck pillows.
      </p>
      <Button
        style="rounded-lg py-3 flex items-center gap-3 hover:translate-y-[-20%] transition-all duration-300 hover:opacity-80"
      >
        <span class="text-2xl">👉</span>
        <span class="font-semibold"> Fly Comfy</span>
      </Button>
    </div>
  </div>
  <!-- Container slides -->
  <div bind:this={container} class="container-page relative overflow-hidden py-10">
    <div class="flex w-max flex-nowrap items-center gap-4">
      {#each [...logos, ...logos] as img}
        <div class="flex-shrink-0 p-3">
          <img class="min-w-[60px]" src={img} alt="Logo" />
        </div>
      {/each}
    </div>
  </div>
  <div class="container-page py-12">
    <div class="mb-10 flex flex-col text-center text-2xl">
      <strong class="text-strong font-semibold">The #1 Travel hacks of 2024</strong>
      <p class="text-title font-semibold">Improve your travels today!</p>
    </div>
    <div class="grid grid-cols-2 items-center gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {#await data.products}
        <h1>Đang tải</h1>
      {:then products}
        {#each data.products as product}
          <ProductItem {product} />
        {/each}
      {:catch error}
        {#if data.error}
          <p>Lỗi khi tải sản phẩm: {data.error}</p>
        {/if}
      {/await}
    </div>
  </div>
  <div class="container-page flex flex-col items-start gap-8 py-12 lg:flex-row">
    <div class="w-full flex-1 overflow-hidden rounded-2xl drop-shadow-2xl">
      <img
        class="w-full"
        src="https://cdn.shopify.com/s/files/1/0818/3060/9177/files/flyhugz_neck_pillow_comfort.png?v=1712570518"
        alt=""
      />
    </div>
    <div class="flex w-full flex-1 flex-col gap-3">
      <h2 class="text-title text-[22px] font-bold lg:text-2xl">
        <strong class="text-strong font-bold">Upgrade</strong> your travel game and
        <strong class="text-strong font-bold">enjoy</strong> perfect relaxation.
      </h2>
      <div>
        <p class="text-title mb-[5px] text-[15px]">
          Experience <strong class="font-bold">unmatched comfort and support</strong> on your travels
          with FlyHugz®.
        </p>
        <p class="text-title text-[15px]">
          Our neck pillow <strong>guarantees a pain-free journey and exceptional sleep</strong> wherever
          your adventures take you.
        </p>
      </div>
      <p class="text-title mb-[5px] text-[13px] lg:text-[15px]">
        It's time to grab yours, with <strong class="font-bold">FREE Shipping Today!</strong>
      </p>

      <Button style="px-[40px] py-[10px] w-max rounded-xl hover:opacity-80">
        <span class="font-bold tracking-wider">👉 Get Your FlyHugz®</span>
      </Button>
      <div class="flex items-start gap-3">
        <div class="max-w-[75px]">
          <img
            src="https://cdn.shopify.com/s/files/1/0818/3060/9177/files/60-days-money-back-guarantee-icon-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector-modified_515cda1e-0172-4aa7-b07c-1c8009afafbb.png?v=1693385999"
            alt=""
            class=""
          />
        </div>
        <div>
          <h2 class="text-lg font-bold">60 Day Money Back</h2>
          <p class="text-title/80 w-[85%] text-[13px] leading-4 lg:text-[16px] lg:leading-6">
            No questions asked, give FlyHugz® a try risk free! And enjoy comfort and sleep like
            never before.
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="max-w-[75px]">
          <img
            src="https://cdn.shopify.com/s/files/1/0818/3060/9177/files/free-delivery-free-svgrepo-com.svg?v=1693389525"
            alt=""
            class=""
          />
        </div>
        <div>
          <h2 class="text-lg font-bold">Free Worldwide Shipping</h2>
          <p class="text-title/80 w-[85%] text-[13px] leading-4 lg:text-[16px] lg:leading-6">
            For a limited time only, enjoy free shipping!
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class=" flex flex-col text-center">
    <div class="mb-7">
      <p class="text-primary text-2xl font-bold">
        What <strong class="text-strong font-bold">our customers</strong> are saying...
      </p>
    </div>
    <div class="container-page relative pb-12">
      <div class="scrollbar-hide flex w-full gap-3 overflow-x-auto whitespace-nowrap">
        {#await data.slides}
          <p>Đang tải đánh giá...</p>
        {:then slides}
          {#each data.slides as slide}
            <div class="max-h-[450px] max-w-[24%] flex-shrink-0 overflow-hidden rounded-2xl">
              <SlideVideo url_video={slide.url_video} />
            </div>
          {/each}
        {:catch error}
          {#if data.error}
            <p>Lỗi khi tải đánh giá: {data.error}</p>
          {/if}
        {/await}
      </div>
      <button
        class="duration-400 absolute left-0 top-[50%] flex size-[25px] translate-y-[-100%] items-center justify-center rounded-full bg-[#00000066] transition-all hover:bg-black md:size-[40px]"
      >
        <ChevronLeftIcon color="#fff" strokeWidth={1} />
      </button>
      <button
        class="duration-400 absolute right-0 top-[50%] flex size-[25px] translate-y-[-100%] items-center justify-center rounded-full bg-[#00000066] transition-all hover:bg-black md:size-[40px]"
      >
        <ChevronRightIcon color="#fff" strokeWidth={1} />
      </button>
    </div>
  </div>
</div>

<style>
</style>
