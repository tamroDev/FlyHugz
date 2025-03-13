<script lang="ts">
	import type { IProduct } from "$lib/schemes/product.type";
	import { StarIcon } from "lucide-svelte";

  export let product: IProduct;
</script>


<div class="rounded-2xl overflow-hidden drop-shadow-2xl bg-white">
  <div class="">
    <img src={product.imgs[0]} alt="">
  </div>
  <div class="text-center flex flex-col justify-center items-center gap-1 shadow-lg">
    <div class="text-center px-2">
      <h4 class="text-[10px] sm:text-sm leading-7 font-semibold">{product.brand}</h4>
      <h1 class="text-title text-sm sm:text-xl font-bold line-clamp-1">{product.name}</h1>
    </div>
    <div class="flex justify-center items-center flex-wrap gap-1">
      <div class="flex md:gap-1 items-center">
        <StarIcon color="#ffa61e" strokeWidth={1.5}  class={"fill-[#ffa61e]  w-[10px] md:w-[15px]"}/>
        <StarIcon color="#ffa61e" strokeWidth={1.5}  class={"fill-[#ffa61e] w-[10px] md:w-[15px]"}/>
        <StarIcon color="#ffa61e" strokeWidth={1.5}  class={"fill-[#ffa61e] w-[10px] md:w-[15px]"}/>
        <StarIcon color="#ffa61e" strokeWidth={1.5}  class={"fill-[#ffa61e] w-[10px] md:w-[15px]"}/>
        <StarIcon color="#ffa61e" strokeWidth={1.5}  class={"fill-[#ffa61e] w-[10px] md:w-[15px]"}/>
      </div>
      <div class="text-[10px] md:text-xs text-title/70">
        ( {product.reviews} Reviews )
      </div>
    </div>
    <div class="flex items-center justify-center gap-2">
      <span class="text-[13px] md:text-[1rem] font-semibold text-title">${product.price}</span>
      <span class="text-[13px] md:text-[1rem] line-through font-semibold text-sm text-title/30 italic">${product.original_price}</span>
    </div>
    <div class="text-[10px] sm:text-sm max-w-[90%] mx-auto -tracking-tighter leading-4 text-title/70 mb-4 md:line-clamp-2">
      "{product.description}"
    </div>
    <button class="bg-button-background text-white w-full py-[8px]">
      View
    </button>
  </div>
</div>