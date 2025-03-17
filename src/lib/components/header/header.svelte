<script lang="ts">
  import { onMount } from 'svelte';
  import { Box } from '../box';
  import { routes } from './nav-links';
  import { ShoppingCartIcon, ChevronDownIcon, SearchIcon, XIcon } from 'lucide-svelte';
  import { fly, fade } from 'svelte/transition';
  // import Button from '../button/button.svelte';

  onMount(() => {
    window.updateCart = () => {
      loadCart();
    };
    loadCart();

    document.addEventListener('click', (e) => {
      if (e.target === outSide) {
        activeCart = false;
      }
    });

    window.addEventListener('productAddedToCart', () => {
      loadCart();
      activeCart = true;
    });

    return () => {
      window.removeEventListener('productAddedToCart', loadCart);
      window.updateCart = undefined;
    };
  });
  interface CartItem {
    id: string;
    title: string;
    oldPrice: number;
    price: number;
    options: string[];
    quantity: number;
    image: string;
    sku: string;
  }

  let cartItems: CartItem[] = [];
  let totalPrice: number = 0;

  function calculateTotal() {
    totalPrice = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  function loadCart() {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cartItems = JSON.parse(savedCart);
        calculateTotal();
      }
    } catch (e) {
      console.error('Lỗi khi đọc giỏ hàng:', e);
      cartItems = [];
    }
  }

  function increaseQuantity(itemId: string) {
    const index = cartItems.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      cartItems[index].quantity += 1;
      cartItems = [...cartItems];
      localStorage.setItem('cart', JSON.stringify(cartItems));
      calculateTotal();
    }
  }

  function decreaseQuantity(itemId: string) {
    const index = cartItems.findIndex((item) => item.id === itemId);
    if (index !== -1 && cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
      cartItems = [...cartItems];
      localStorage.setItem('cart', JSON.stringify(cartItems));

      calculateTotal();
    }
  }

  function removeItem(itemId: string) {
    cartItems = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    calculateTotal();
  }

  onMount(() => {
    loadCart();
    window.addEventListener('cartUpdated', loadCart);

    return () => {
      window.removeEventListener('cartUpdated', loadCart);
    };
  });

  let activeMenu = false;
  let activeCart = false;
  let outSide: HTMLElement;

  onMount(() => {
    document.addEventListener('click', (e) => {
      if (e.target === outSide) {
        activeCart = false;
      }
    });
  });
</script>

<header class="fixed top-0 right-0 left-0 z-[998] bg-white">
  <div class="bg-button-background">
    <div class="container-page flex size-full items-center justify-center">
      <div class="mx-auto py-2.5 text-center">
        <span
          class="header:tracking-[.1rem] text-sm leading-[16.9px] font-[600] tracking-[0px] text-white"
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
              class="header:max-w-[180px] max-w-[120px]"
              src="https://flyhugz.com/cdn/shop/files/FlyHugz_Main_R_logo_Black.png?v=1730635110&width=270"
              alt=""
            />
          </a>
          <ul class="header:flex hidden items-center">
            {#each routes as route, index}
              {#if route.subItem}
                <div
                  role="button"
                  tabindex="0"
                  on:keypress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      activeMenu = !activeMenu;
                    }
                  }}
                  on:click={() => (activeMenu = !activeMenu)}
                  class="relative"
                >
                  <a class="flex items-center p-3 text-sm" href={route.href}>
                    <span
                      class={`${index === 0 ? '!text-primary hover:border-b-[2px]' : 'hover:text-primary hover:!border-b-primary  !border-white'} border-b-primary text-primary/50 border-b`}
                      >{route.title}
                    </span>
                    <div
                      class={`transition-all duration-200 ${activeMenu ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <ChevronDownIcon size={16} strokeWidth={0.5} />
                    </div>
                  </a>
                  {#if activeMenu}
                    <div
                      in:fly={{ y: -500, duration: 500 }}
                      out:fly={{ y: -500, duration: 500 }}
                      class="border-primary/10 absolute top-[65px] right-0 flex w-max items-start justify-start border"
                    >
                      {#each route.subItem as subItem}
                        <a class="px-3 py-2 bg-white" href={subItem.href}>{subItem.title}</a>
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
          <button
            on:click={() => (activeCart = !activeCart)}
            class="cursor-pointer transition-all duration-200 hover:scale-[1.1]"
          >
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
  <div class="cart-container">
    <div class="wrapper-cart">
      <span bind:this={outSide} transition:fade={{ duration: 300 }} class="coating"></span>
      <div transition:fly={{ x: 400, duration: 400 }} class="cart">
        <div class="cart-product">
          <header>
            <div>
              <svg
                focusable="false"
                width="21"
                height="20"
                class="icon icon--header-shopping-cart"
                viewBox="0 0 21 20"
              >
                <path d="M0 1H4L5 11H17L19 4H8" fill="none" stroke="currentColor" stroke-width="2"
                ></path>
                <circle cx="6" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="2"
                ></circle>
                <circle cx="16" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="2"
                ></circle>
              </svg>
              <h1>Your Cart</h1>
            </div>
            <button on:click={() => (activeCart = !activeCart)} class="close-btn">
              <svg
                focusable="false"
                width="14"
                height="14"
                class="icon icon--close"
                viewBox="0 0 14 14"
              >
                <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="2" fill="none"
                ></path>
              </svg>
            </button>
          </header>
          {#if cartItems.length > 0}
            <div transition:fade={{ duration: 200 }} class="wrapper-progess-cart !block">
              <span class="drawer__subtitle">Excellent choice! Here are your products:</span>
              <span class="shipping-bar__progress"></span>
              <span class="shipping-bar__text text--small">You unlocked free shipping!</span>
            </div>
          {/if}
          {#if cartItems.length === 0}
            <div transition:fade={{ duration: 200 }} class="cart-empty">
              <p>Your cart is empty</p>
              <a href="#">Start Shopping</a>
            </div>
          {:else}
            <div transition:fade={{ duration: 200 }} class="product-cart overflow-y-auto">
              {#each cartItems as item, i (item.id)}
                <div 
                  transition:fade={{ delay: i * 50, duration: 200 }}
                  class="cart-item"
                >
                  <img class="max-w-[80px]" src={item.image} alt={item.title} />
                  <div class="cart-info">
                    <div class="text-info">
                      <h3>{item.title}</h3>
                      <div class="price">
                        <span class="old-price">${item.oldPrice}</span>
                        <span class="current-price">${item.price}</span>
                      </div>
                    </div>
                    <div class="flex text-xs font-medium">
                      {#each item.options as option}
                        <div class="pack mr-1">{option}</div>
                      {/each}
                    </div>
                    <div class="control-info">
                      <div class="quantity-control">
                        <button class="decrease" on:click={() => decreaseQuantity(item.id)}
                          >-</button
                        >
                        <span>{item.quantity}</span>
                        <button class="increase" on:click={() => increaseQuantity(item.id)}
                          >+</button
                        >
                      </div>
                      <button class="remove" on:click={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
        {#if cartItems.length > 0}
          <div transition:fade={{ duration: 300 }} class="final-cart">
            <div class="text-final">
              <h3>Shipping</h3>
              <p class="ship-price" style="color: #31943a">Free</p>
            </div>
            <div class="text-final">
              <h3>Total</h3>
              <p class="total-price">${totalPrice.toFixed(2)}</p>
            </div>
            <button on:click={() => activeCart = false} class="addToCart">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="512.000000pt"
                height="512.000000pt"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#fff"
                  stroke="none"
                >
                  <path
                    d="M2375 5105 c-627 -88 -1110 -588 -1175 -1216 -5 -56 -10 -276 -10
                -490 l0 -389 -147 0 c-134 0 -153 -2 -199 -24 -58 -27 -120 -94 -134 -145 -6
                -23 -10 -510 -10 -1341 l0 -1305 24 -51 c13 -28 41 -65 62 -82 80 -66 -41 -62
                1774 -62 1815 0 1694 -4 1774 62 21 17 49 54 62 82 l24 51 0 1305 c0 831 -4
                1318 -10 1341 -14 51 -76 118 -134 145 -46 22 -65 24 -198 24 l-148 0 0 389
                c0 214 -5 434 -10 490 -79 769 -783 1323 -1545 1216z m363 -511 c285 -58 528
                -269 632 -548 46 -121 50 -168 50 -613 l0 -423 -860 0 -860 0 0 423 c0 445 4
                492 50 613 103 276 344 487 625 547 94 21 267 21 363 1z"
                  ></path>
                </g>
              </svg>
              <span><a href="/checkout">CONTINUE TO SAFE CHECKOUT</a></span>
            </button>
            <img
              loading="lazy"
              src="https://bleame.vercel.app/assets/images/payment-list.webp"
              alt=""
            />
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}