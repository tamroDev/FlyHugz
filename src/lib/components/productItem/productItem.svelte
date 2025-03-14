<script lang="ts">
  import type { IProduct } from '$lib/schemes/product.type';
  import { StarIcon } from 'lucide-svelte';

  export let product;
</script>

<div class="overflow-hidden rounded-2xl bg-white drop-shadow-2xl">
  <div class="">
    <img src={"https://flyhugz.com/cdn/shop/files/FREETravelBag_34.jpg?v=1713704758"} alt="" />
  </div>
  <div class="flex flex-col items-center justify-center gap-1 text-center shadow-lg">
    <div class="px-2 text-center">
      <!-- <h4 class="text-[10px] font-semibold leading-7 sm:text-sm">{product.brand}</h4> -->
      <h1 class="text-title line-clamp-1 text-sm font-bold sm:text-xl">{product.title}</h1>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-1">
      <div class="flex items-center md:gap-1">
        <StarIcon
          color="#ffa61e"
          strokeWidth={1.5}
          class={'w-[10px]  fill-[#ffa61e] md:w-[15px]'}
        />
        <StarIcon color="#ffa61e" strokeWidth={1.5} class={'w-[10px] fill-[#ffa61e] md:w-[15px]'} />
        <StarIcon color="#ffa61e" strokeWidth={1.5} class={'w-[10px] fill-[#ffa61e] md:w-[15px]'} />
        <StarIcon color="#ffa61e" strokeWidth={1.5} class={'w-[10px] fill-[#ffa61e] md:w-[15px]'} />
        <StarIcon color="#ffa61e" strokeWidth={1.5} class={'w-[10px] fill-[#ffa61e] md:w-[15px]'} />
      </div>
      <div class="text-title/70 text-[10px] md:text-xs">
        <!-- ( {product.reviews} Reviews ) -->
      </div>
    </div>
    <div class="flex items-center justify-center gap-2">
      <span class="text-title text-[13px] font-semibold md:text-[1rem]">${product.price}</span>
      <span
        class="text-title/30 text-[13px] text-sm font-semibold italic line-through md:text-[1rem]"
        >${product.compare_at_price}</span
      >
    </div>
    <div
      class="text-title/70 mx-auto mb-4 line-clamp-2 max-w-[90%] text-[10px] leading-4 -tracking-tighter sm:text-sm"
    >
      <!-- "{product.description}" -->
    </div>
    <button class="bg-button-background w-full py-[8px] text-white"> <a href={`/product/${product.id}`}>View</a> </button>
  </div>
</div>
