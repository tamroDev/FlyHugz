<script lang="ts">
	import { onMount } from 'svelte';
	import { Box } from '../box';
	import { routes } from './nav-links';
	import { ShoppingCartIcon, ChevronDownIcon, SearchIcon,XIcon } from 'lucide-svelte';
	import {  fly,fade } from 'svelte/transition';
	import Button from '../button/button.svelte';

	let activeMenu = false;
	let activeCart = false;
	let outSide: HTMLElement;

	onMount(() => {
		document.addEventListener("click",(e) => {
			if(e.target === outSide) {
				activeCart = false;
			}
		})
	})
</script>

<header>
	<div class="bg-button-background">
		<div class="container-page flex size-full items-center justify-center">
			<div class="py-2.5">
				<span class="text-center text-sm font-[600] leading-[16.9px] tracking-[.1rem] text-white"
					>Spring Sale! 🎁 Get 50% OFF + FREE Shipping!</span
				>
			</div>
		</div>
	</div>
	<div class="border border-[#12121214]">
		<div class="container-page">
			<Box typeBox="between" style="py-1 gap-8">
				<Box style="gap-3">
					<a href="/" class="p-2">
						<img
							class="max-w-[180px]"
							src="https://flyhugz.com/cdn/shop/files/FlyHugz_Main_R_logo_Black.png?v=1730635110&width=270"
							alt=""
						/>
					</a>
					<ul class="hidden header:flex items-center">
						{#each routes as route, index}
							{#if route.subItem}
								<div role="button" tabindex="0" on:keypress={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault(); 
										activeMenu = !activeMenu;
									}
								}}  on:click={() => (activeMenu = !activeMenu)} class="relative">
									<a class="flex items-center p-3 text-sm" href={route.href}>
										<span
											class={`${index === 0 ? '!text-primary hover:border-b-[2px]' : 'hover:text-primary hover:!border-b-primary  !border-white'} border-b-primary text-primary/50 border-b`}
											>{route.title}
										</span>
											<div class={`transition-all duration-200 ${activeMenu ? "rotate-180" : 'rotate-0' }`}>
												<ChevronDownIcon size={16} strokeWidth={0.5} />
											</div>
									</a>
									{#if activeMenu}
										<div in:fly={{ y: -500, duration: 500}} out:fly={{ y: -500, duration: 500}} class="absolute top-[65px] right-0 w-max border border-primary/10 flex justify-start items-start">
											{#each route.subItem as subItem}
												<a class="px-3 py-2" href={subItem.href}>{subItem.title}</a>
											{/each}
										</div>
									{/if}

								</div>
							{:else}
								<li>
									<a class={`p-3 text-sm`} href={route.href}>
										<span
											class={`${index === 0 ? '!text-primary hover:border-b-[2px]' : 'hover:text-primary hover:!border-b-primary  !border-white'} border-b-primary text-primary/50 border-b`}
											>{route.title}</span
										>
									</a>
								</li>
							{/if}
						{/each}
					</ul>
				</Box>
				<Box style="gap-3">
					<button on:click={() => activeCart = !activeCart} class="cursor-pointer transition-all duration-200 hover:scale-[1.1]">
						<ShoppingCartIcon size={20} strokeWidth={1} />
					</button>
					<button class="cursor-pointer transition-all duration-200 hover:scale-[1.1]">
						<SearchIcon size={20} strokeWidth={1} />
					</button>
				</Box>
			</Box>
			<div class="flex items-center justify-between gap-8 py-1"></div>
		</div>
	</div>
</header>
{#if activeCart}
	<div transition:fade  class="fixed inset-0 bg-[#2d343680] flex">
		<div bind:this={outSide} class="flex-1"></div>
		<div transition:fly={{ x: 400, duration: 400}} class="max-w-[400px] flex-1 bg-white">
			<!-- <div class="p-3.5 flex items-center border-b border-border-main">
				<div class="flex-1 text-center">
					<h1 class="text-title text-2xl font-semibold leading-8">Your FlyHugz® Cart</h1>
				</div>
				<button>
					<XIcon class={"text-title"} strokeWidth={1.25} />
				</button>
			</div> -->

			<div class="flex-1 h-full flex justify-center items-center flex-col gap-3.5">
				<h1 class="text-title font-medium">Your cart is empty</h1>
				<Button style="px-4 py-2 bg-button-background text-white">
					Continue shopping
				</Button>
			</div>
		</div>
	</div>
{/if}