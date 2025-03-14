<script lang="ts">
  import { Button } from '$lib/components/button';
  import { onMount, onDestroy } from 'svelte';
  import ProductItem from '$lib/components/productItem/productItem.svelte';
  // import SlideVideo from '$lib/components/slide/slide_video.svelte';
  // import type { IProduct } from '$lib/schemes/product.type';
  // import type { ISlide } from '$lib/schemes/slide.type';
  import { ChevronRightIcon, ChevronLeftIcon, StarIcon } from 'lucide-svelte';
  // import type { IReview } from '$lib/schemes/review.type';

  // let { data } = $props<{
  //   data: {},
  //   products: IProduct[];
  //   slides: ISlide[];
  //   reviews: IReview[];
  //   error?: string;
  // }>();

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

  let {data}=$props();
</script>

<div>
  <div class="bg-[#ebe6e2]">
    <div class="container-page flex flex-col items-center justify-center gap-2 py-14 md:gap-4">
      <img
      class="max-w-[300px]"
      src="https://cdn.shopify.com/s/files/1/0818/3060/9177/files/0a7c39e06aca460d8994d199a18d0595.png?v=1712147018"
      alt=""
      />
      <h1 class="text-title text-center text-xl font-bold md:text-3xl">
        Arrive Relaxed & Refreshed.
      </h1>
      <p class="text-primary text-center text-[12px] tracking-wider md:text-[15px]">
        Experience your journeys in a new light with our premium FlyHugz® neck pillows.
      </p>
      <Button
        style="rounded-lg py-2 md:py-3 flex items-center gap-3 hover:translate-y-[-20%] transition-all duration-300 hover:opacity-80"
      >
        <span class="text-lg md:text-2xl">👉</span>
        <span class="font-semibold"> Fly Comfy</span>
      </Button>
    </div>
  </div>
  <!-- Container slides -->
  <div bind:this={container} class="container-page relative overflow-hidden py-10">
    <div class="flex w-max flex-nowrap items-center gap-4">
      {#each [...logos, ...logos] as img}
        <div class="flex-shrink-0 p-3">
          <img class="max-w-[60px] md:min-w-[60px] md:max-w-none" src={img} alt="Logo" />
        </div>
      {/each}
    </div>
  </div>
  <div class="container-page py-8 md:py-12">
    <div class="mb-4 flex flex-col text-center text-lg md:mb-10 md:text-2xl">
      <strong class="text-strong font-semibold">The #1 Travel hacks of 2024</strong>
      <p class="text-title font-semibold">Improve your travels today!</p>
    </div>
    <div class="grid grid-cols-2 items-center gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {#await data.data}
          <h1>Đang tải</h1>
        {:then resolvedData}
          {#each resolvedData.data as product }
          <ProductItem {product}/>
          {/each}
        {:catch error}
          <p>Lỗi khi tải sản phẩm: {error.message || 'Không xác định'}</p>
        {/await}
    </div>
  </div>
  <div class="container-page flex flex-col items-start gap-4 py-8 md:gap-8 md:py-12 lg:flex-row">
    <div class="w-full flex-1 overflow-hidden rounded-2xl drop-shadow-2xl">
      <img
        class="w-full"
        src="https://cdn.shopify.com/s/files/1/0818/3060/9177/files/flyhugz_neck_pillow_comfort.png?v=1712570518"
        alt=""
      />
    </div>
    <div class="flex w-full flex-1 flex-col gap-3">
      <h2 class="text-title text-[20px] font-bold lg:text-2xl">
        <strong class="text-strong font-bold">Upgrade</strong> your travel game and
        <strong class="text-strong font-bold">enjoy</strong> perfect relaxation.
      </h2>
      <div>
        <p class="text-title mb-[5px] text-[12px] md:text-[15px]">
          Experience <strong class="font-bold">unmatched comfort and support</strong> on your travels
          with FlyHugz®.
        </p>
        <p class="text-title text-[12px] md:text-[15px]">
          Our neck pillow <strong>guarantees a pain-free journey and exceptional sleep</strong> wherever
          your adventures take you.
        </p>
      </div>
      <p class="text-title mb-[5px] text-[12px] lg:text-[15px]">
        It's time to grab yours, with <strong class="font-bold">FREE Shipping Today!</strong>
      </p>

      <Button
        style="px-[25px] md:px-[40px] py-[7px] md:py-[10px] w-max rounded-xl hover:opacity-80"
      >
        <span class="font-bold tracking-wider">👉 Get Your FlyHugz®</span>
      </Button>
      <div class="flex items-start gap-3">
        <div class="max-w-[60px] md:max-w-[75px]">
          <img
            src="https://cdn.shopify.com/s/files/1/0818/3060/9177/files/60-days-money-back-guarantee-icon-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector-modified_515cda1e-0172-4aa7-b07c-1c8009afafbb.png?v=1693385999"
            alt=""
            class=""
          />
        </div>
        <div>
          <h2 class="text-lg font-bold">60 Day Money Back</h2>
          <p class="text-title/80 w-[85%] text-[12px] leading-4 lg:text-[16px] lg:leading-6">
            No questions asked, give FlyHugz® a try risk free! And enjoy comfort and sleep like
            never before.
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="max-w-[60px] md:max-w-[75px]">
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
      <div class="scrollbar-hide flex w-full gap-2 overflow-x-auto whitespace-nowrap md:gap-3">
        <!-- {#await data.slides}
          <p>Đang tải đánh giá...</p>
        {:then slides}
          {#each data.slides as slide}
            <div
              class="max-h-[500px] max-w-[49%] flex-shrink-0 overflow-hidden rounded-2xl md:max-w-[24%]"
            >
              <SlideVideo url_video={slide.url_video} />
            </div>
          {/each}
        {:catch error}
          {#if data.error}
            <p>Lỗi khi tải đánh giá: {data.error}</p>
          {/if}
        {/await} -->
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
  <div class="bg-title">
    <div
      class="container-page flex flex-col items-center justify-around py-8 text-white md:flex-row"
    >
      <div class="mb-5 text-lg font-bold md:mb-0 md:text-2xl">Time for an upgrade.</div>
      <div class="max-w-[500px] text-center text-[13px] font-bold tracking-[1px] md:text-[16px]">
        FlyHugz® will maximize your comfort every time, everywhere.
      </div>
    </div>
  </div>
  <div class="bg-[#ebe6e2] py-8 md:py-12">
    <div class="container-page flex flex-col items-start gap-8 md:flex-row">
      <div class="w-full flex-1 overflow-hidden rounded-2xl drop-shadow-2xl">
        <video autoplay muted loop>
          <source src="https://cdn.shopify.com/videos/c/o/v/0888011377b0423d90397e4f173fc2a2.mp4" />
        </video>
      </div>
      <div class="flex w-full flex-1 flex-col gap-3">
        <h2 class="text-title text-center text-lg font-bold lg:text-2xl">
          <strong class="text-strong font-bold">Experience instant relief </strong> from neck pain and
          travel discomfort.
        </h2>
        <div class="text-center md:text-start">
          <p class="text-title mb-[5px] text-[12px] md:text-[15px]">
            After <strong class="font-bold">months</strong> of research and dedication, we proudly
            introduce
            <strong class="font-bold">FlyHugz®.</strong> It's the only neck pillow that offers a
            <strong class="font-bold">unique combination</strong> of targeted neck support,
            <strong class="font-bold">ergonomic design</strong>, and
            <strong class="font-bold">premium materials</strong> for comfort.
          </p>
          <p class="text-title text-[12px] md:text-[15px]">
            Many customers reported they have experienced <strong class="font-bold">relief</strong>
            from neck pain and <strong class="font-bold">travel fatigue</strong> during their journey
            and it's time for you to experience the same.
          </p>
        </div>

        <Button
          style="px-[25px] md:px-[40px] py-[7px] md:py-[10px] w-max rounded-xl hover:opacity-80 md:mx-0 mx-auto"
        >
          <span class="font-bold tracking-wider">👉 To Our Collection</span>
        </Button>
      </div>
    </div>
  </div>
  <div class="border-b border-[#d5d9d9] py-5">
    <div class="container-page footer:flex-row flex flex-col items-center justify-between px-4">
      <div class="flex-1">
        <img
          class="footer:max-w-full mx-auto max-w-[80%]"
          src="https://cdn.shopify.com/s/files/1/0818/3060/9177/files/f3b066a2-1b0c-4cc8-99d8-fcede1bd8ebc.png?v=1704628130"
          alt=""
        />
      </div>
      <div class="footer:items-start flex flex-1 flex-col items-center gap-3 md:gap-5">
        <h1 class="text-primary footer:text-2xl text-lg font-bold">60 Day Money Back Guaranteed</h1>
        <p
          class="text-title/80 footer:text-[16px] max-w-[500px] text-center text-[13px] leading-4 tracking-wider md:max-w-none md:text-start lg:leading-6"
        >
          Your satisfaction is our guarantee. If for any reason you need to send them back, we’ve
          got you covered.
        </p>
        <Button style="px-[40px] py-[10px] w-max rounded-xl hover:opacity-80">
          <span class="footer:text-[16px] text-[13px] font-bold tracking-wider"
            >👉 Get Your FlyHugz®</span
          >
        </Button>
      </div>
    </div>
  </div>
  <div class="footer:flex-row footer:px-12 flex flex-col items-start px-6 py-5">
    <div class="footer:flex-col footer:flex-nowrap footer:w-max flex w-full flex-wrap gap-3">
      <div
        class="reviews:flex-col flex w-full flex-row flex-wrap items-start justify-between border-b border-[#d5d9d9]"
      >
        <div class="mb-5 w-max">
          <h1 class="text-primary text-lg footer:text-2xl font-semibold">Customer reviews</h1>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <ul class="flex items-center">
                <li><StarIcon class="fill-[#ffa61e]" color="#ffa61e" strokeWidth={0.5} /></li>
                <li><StarIcon class="fill-[#ffa61e]" color="#ffa61e" strokeWidth={0.5} /></li>
                <li><StarIcon class="fill-[#ffa61e]" color="#ffa61e" strokeWidth={0.5} /></li>
                <li><StarIcon class="fill-[#ffa61e]" color="#ffa61e" strokeWidth={0.5} /></li>
                <li><StarIcon class="fill-[#ffa61e]" color="#ffa61e" strokeWidth={0.5} /></li>
              </ul>
              <p class="text-primary/70">4.2 out of 5</p>
            </div>
            <h4 class="text-primary/50 text-sm">2,245 global ratings</h4>
          </div>
        </div>
        <div class="flex flex-col pb-5">
          <div
            class="group mb-1 flex cursor-pointer items-center justify-between gap-1 whitespace-nowrap"
          >
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">5 star</span
            >
            <div class="relative w-[200px] rounded-sm border border-gray-400 bg-white py-2">
              <div class="absolute bottom-0 left-0 top-0 h-full w-[60%] bg-[#ffa61e]"></div>
            </div>
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">60%</span>
          </div>
          <div
            class="group mb-1 flex cursor-pointer items-center justify-between gap-1 whitespace-nowrap"
          >
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">4 star</span
            >
            <div class="relative w-[200px] rounded-sm border border-gray-400 bg-white py-2">
              <div class="absolute bottom-0 left-0 top-0 h-full w-[19%] bg-[#ffa61e]"></div>
            </div>
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">19%</span>
          </div>
          <div
            class="group mb-1 flex cursor-pointer items-center justify-between gap-1 whitespace-nowrap"
          >
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">3 star</span
            >
            <div class="relative w-[200px] rounded-sm border border-gray-400 bg-white py-2">
              <div class="absolute bottom-0 left-0 top-0 h-full w-[9%] bg-[#ffa61e]"></div>
            </div>
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">9%</span>
          </div>
          <div
            class="group mb-1 flex cursor-pointer items-center justify-between gap-1 whitespace-nowrap"
          >
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">2 star</span
            >
            <div class="relative w-[200px] rounded-sm border border-gray-400 bg-white py-2">
              <div class="absolute bottom-0 left-0 top-0 h-full w-[5%] bg-[#ffa61e]"></div>
            </div>
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">5%</span>
          </div>
          <div class="group mb-1 flex cursor-pointer items-center justify-between gap-1">
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">1 star</span
            >
            <div class="relative w-[200px] rounded-sm border border-gray-400 bg-white py-2">
              <div class="absolute bottom-0 left-0 top-0 h-full w-[7%] bg-[#ffa61e]"></div>
            </div>
            <span class="min-w-[55px] font-medium text-[#2162a1] group-hover:underline">7%</span>
          </div>
        </div>
      </div>
      <div class="w-full border-b border-[#d5d9d9] py-5">
        <h1 class="mb-1 font-bold">Review this product</h1>
        <p class="mb-4 text-sm">Share your thoughts with other customers</p>
        <Button
          style="!bg-white !text-primary/90 rounded-2xl border-2 border-[#888c8c] !py-1 hover:!bg-black hover:!text-white transition-all duration-300"
          ><span class="text-[14px]">Write a customer review</span></Button
        >
      </div>
    </div>
    <div class="footer:w-max w-full flex-1">
      <div class="footer:px-4 footer:mb-4  border-b border-[#d5d9d9] footer:pb-4">
        <h1 class="text-primary header:py-0 py-3 font-bold md:text-lg">
          Top reviews from the United States
        </h1>
      </div>
      <div class="flex flex-col">
        <!-- {#await data.reviews}
          <p>Đang tải đánh giá...</p>
        {:then reviews}
          {#each data.reviews as review}
          <div class="flex flex-col footer:pt-0 py-5 footer:pl-12 ">
            <div class="flex items-center gap-3">
              <img class="max-w-[30px] rounded-full" src={review.avatarUser.length <= 0 ? "https://m.media-amazon.com/images/S/amazon-avatars-global/default.png" : review.avatarUser}  alt="">
              <h2 class="text-sm font-medium">{review.nameUser}</h2>
            </div>
            <div class="flex flex-col items-start">
            <div class="flex gap-2 items-center">
              <div class="flex items-center">
                <StarIcon color="#ffa61e" class="fill-[#ffa61e] max-w-[15px]" />
                <StarIcon color="#ffa61e" class="fill-[#ffa61e] max-w-[15px]" />
                <StarIcon color="#ffa61e" class="fill-[#ffa61e] max-w-[15px]" />
                <StarIcon color="#ffa61e" class="fill-[#ffa61e] max-w-[15px]" />
                <StarIcon color="#ffa61e" class="fill-[#ffa61e] max-w-[15px]" />
              </div>
              <h1 class="text-sm font-semibold text-primary line-clamp-1">{review.titleReview}</h1>
            </div>  
              <span class="text-[#566169] text-sm mb-2">Reviewed in the {review.locationReview} on {review.time}</span>
              <div class="flex flex-col gap-3 mb-5">
                <p class="text-sm text-[#0f1137] font-medium">{review.contentReview}</p>
              </div>
              <div class="flex gap-2 mb-3">
                 {#each review.imgsContent as img }
                    <img class="max-w-[100px] rounded-lg" src={img} alt="">
                 {/each}
              </div>
              <div class="text-[15px] text-[#565959] mb-2">
                {review.interestedPerson} people found this helpful
              </div>
              <div class="text-[#565959] flex items-center gap-4">
                <button class="px-4 py-1 border border-[#888c8c] rounded-3xl cursor-pointer text-sm text-black font-medium">Helpful</button>
                <div class="w-[0.3px] h-4 bg-[#56595932]"></div>
                <div class="cursor-pointer hover:underline">
                  Report
                </div>
              </div>
            </div>
            <div class="border-b border-[#d5d9d9] max-w-[80%] mt-7">

            </div>
          </div>
          {/each}
        {:catch error}
          {#if data.error}
            <p>Lỗi khi tải đánh giá: {data.error}</p>
          {/if}
        {/await} -->
        
      </div>
    </div>
  </div>
</div>

<style>
</style>
