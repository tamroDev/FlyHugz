<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  // Type definitions
  interface INation {
    name: string;
    flag: string;
  }

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

  // Nation selection
  let selectedNation: INation = {
    name: 'Việt Nam',
    flag: 'https://flagcdn.com/w40/vn.png'
  };

  function handleSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const foundNation = nations.find((n) => n.name === target.value);

    if (foundNation) {
      selectedNation = { ...foundNation };
    }
  }

  const nations: INation[] = [
    { name: 'Việt Nam', flag: 'https://flagcdn.com/w40/vn.png' },
    { name: 'Hoa Kỳ', flag: 'https://flagcdn.com/w40/us.png' },
    { name: 'Nhật Bản', flag: 'https://flagcdn.com/w40/jp.png' },
    { name: 'Hàn Quốc', flag: 'https://flagcdn.com/w40/kr.png' },
    { name: 'Trung Quốc', flag: 'https://flagcdn.com/w40/cn.png' },
    { name: 'Pháp', flag: 'https://flagcdn.com/w40/fr.png' },
    { name: 'Đức', flag: 'https://flagcdn.com/w40/de.png' },
    { name: 'Anh', flag: 'https://flagcdn.com/w40/gb.png' },
    { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
    { name: 'Ý', flag: 'https://flagcdn.com/w40/it.png' }
  ];

  // Checkout form state
  let showForm = true;
  let showFormMain = false;

  // Cart items
  let cartItems: CartItem[] = [];
  let subtotal: number = 0;
  let tax: number = 0;
  let totalPrice: number = 0;

  // Hàm tính tổng
  function calculateTotal() {
    subtotal = cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price.toString()) * item.quantity);
    }, 0);
    
    tax = subtotal * 0.1; // 10% thuế, tùy chỉnh theo nhu cầu
    totalPrice = subtotal + tax;
  }

  // Hàm tải giỏ hàng từ localStorage
  function loadCart() {
    try {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          cartItems = JSON.parse(savedCart);
          calculateTotal();
        }
      }
    } catch (e) {
      console.error('Lỗi khi đọc giỏ hàng:', e);
      cartItems = [];
      totalPrice = 0;
    }
  }

  onMount(() => {
    loadCart();
    
    // Lắng nghe sự kiện thay đổi giỏ hàng nếu cần
    window.addEventListener('cartUpdated', loadCart);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCart);
    };
  });
</script>

<div class="flex mt-[100px] justify-center py-12 px-4 lg:px-0">
  <!-- Phần bên trái - Form Checkout -->
  <div class="w-full lg:w-[500px] lg:mr-8">
    <h1 class="mb-0.5 text-lg leading-6 font-bold text-[#121212]">Contact information</h1>
    <input
      type="text"
      class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
      placeholder="Email"
      name="email"
    />
    <h1 class="mb-[8px] text-lg leading-6 font-bold text-[#121212]">Payment</h1>
    <p class="mb-[16px] text-[12px] text-[#8e8e8e]">All transactions are secure and encrypted.</p>
    <div class="relative rounded-md border border-[#00000020] p-[24px]">
      <div
        class="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-2 text-[12px] text-[#8e8e8e]"
      >
        Express checkout
      </div>
      {#if !showFormMain}
        <button transition:fade={{ duration: 300 }}
          class="mb-3 flex h-[55px] w-full cursor-pointer items-center justify-center rounded-md bg-[#ffc439] hover:opacity-90 transition-all duration-300"
        >
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4"
            alt=""
          />
        </button>
      {/if}

      <button
        class="transition-all duration-300 flex h-[55px] w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#353738] font-sans text-white hover:opacity-90"
        on:click={() => (showFormMain = !showFormMain)}
      >
        <svg
          data-v-56bd7dfc=""
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-wallet-minimal"
        ><path d="M17 14h.01"></path><path
            d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"
          ></path></svg
        >
        <span class="text-lg">Thẻ ghi nợ hoặc tín dụng</span>
      </button>
      {#if showFormMain}
        <form
          transition:fade={{ duration: 300 }}
          class="transition-all duration-300 w-full pb-12 font-sans text-[13px]"
        >
          <div class="mx-auto w-full max-w-[400px] pt-[20px]">
            <button
              on:click={() => (showFormMain = false)}
              class="mb-2 flex w-full cursor-pointer justify-end py-2"
            >
              <svg
                data-v-56bd7dfc=""
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>

            <div>
              <div>
                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Số thẻ"
                  name="numberCard"
                />
              </div>
              <div class="flex items-center justify-center gap-2">
                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Hết hạn"
                  name="expiryDate"
                />

                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="CSC"
                  name="csc"
                />
              </div>

              <div class="mb-2 flex items-center justify-between py-3">
                <h1 class="text-xl">Địa chỉ thẻ</h1>

                <div class="flex items-center gap-2">
                  <img src={selectedNation.flag} alt={selectedNation.name} class="h-4 w-6" />
                  <select on:change={handleSelect} class="max-w-[120px] rounded border p-2 py-3">
                    {#each nations as nation}
                      <option value={nation.name} selected={nation.name === selectedNation.name}>
                        {nation.name}
                      </option>
                    {/each}
                  </select>
                </div>
              </div>

              <div class="flex items-center justify-center gap-2">
                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Họ"
                  name="lastName"
                />

                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Tên"
                  name="firstName"
                />
              </div>

              <div>
                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Dòng địa chỉ 1"
                  name="addressLine1"
                />
              </div>

              <div>
                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Dòng địa chỉ 2"
                  name="addressLine2"
                />
              </div>

              <div>
                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Thị trấn"
                  name="town"
                />
              </div>

              <div>
                <select
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  name="state"
                >
                  <option value="">Thành phố trực thuộc / Tỉnh</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Mã bưu chính"
                  name="postalCode"
                />
              </div>

              <div>
                <input
                  type="text"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Số di động"
                  name="phone"
                />
              </div>

              <div class="mb-5">
                <input
                  type="email"
                  class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                  placeholder="Email"
                  name="email"
                />
              </div>

              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-3">
                  <input class="size-5 border-none" type="checkbox" bind:checked={showForm} />
                  <label>Giao đến địa chỉ thanh toán</label>
                </div>

                {#if !showForm}
                  <div class="form-add">
                    <div class="mb-2 flex items-center justify-between py-3">
                      <h1 class="text-xl">Địa chỉ giao hàng</h1>

                      <div class="flex items-center gap-2">
                        <img src={selectedNation.flag} alt={selectedNation.name} class="h-4 w-6" />
                        <select
                          on:change={handleSelect}
                          class="max-w-[120px] rounded border p-2 py-3"
                        >
                          {#each nations as nation}
                            <option
                              value={nation.name}
                              selected={nation.name === selectedNation.name}
                            >
                              {nation.name}
                            </option>
                          {/each}
                        </select>
                      </div>
                    </div>

                    <div class="flex items-center justify-center gap-2">
                      <input
                        type="text"
                        class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                        placeholder="Nhập họ"
                        name="lastName"
                      />

                      <input
                        type="text"
                        class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                        placeholder="Nhập tên"
                        name="firstName"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                        placeholder="Số nhà, tên đường"
                        name="addressLine1"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                        placeholder="Thông tin bổ sung (nếu có)"
                        name="addressLine2"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                        placeholder="Nhập thị trấn / phường"
                        name="town"
                      />
                    </div>

                    <div>
                      <select
                        class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                        name="state"
                      >
                        <option value="">Chọn tỉnh / thành phố</option>
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        class="mb-4 w-full rounded-md border border-[#bdbdbd] px-4 py-3 outline-none focus:border-[#80bdff]"
                        placeholder="Nhập mã bưu chính"
                        name="postalCode"
                        />
                    </div>
                  </div>
                {/if}

                <div class="flex items-center gap-3">
                  <input class="size-5 min-w-5 border-none" type="checkbox" name="" id="" />
                  <label for=""
                    >Tôi xác nhận rằng tôi đã đủ tuổi pháp định và đồng ý với 
                      class="text-sm text-blue-500 underline"
                      href=""
                      <a>Tuyên bố về quyền riêng tư
                    </a> của PayPal</label
                  >
                </div>
              </div>
            </div>
          </div>
        </form>
      {/if}

      <div class="mt-5 flex items-center justify-center gap-2">
        <span class="font-sans text-[10px] text-[#8e9099] italic">Được hỗ trợ bởi</span>
        <img
          class="w-[60px]"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4"
          alt=""
        />
      </div>
    </div>
    <div
      class="mt-5 flex flex-col items-center justify-center gap-3 border-b border-black pt-5 pb-8 text-center text-sm font-light"
    >
      <h2>All transactions are secure and encrypted by</h2>
      <div class="max-w-[60%]">
        <img src="https://www.usapomshop.com/assets/brands.png" alt="" />
      </div>
    </div>
    <div class="pt-4 text-[15px] font-light">All Rights Reserved</div>
  </div>

  <!-- Phần bên phải - Tóm tắt giỏ hàng -->
  <div class="hidden lg:block w-[350px] bg-gray-50 p-6 rounded-md sticky top-[150px] self-start h-fit">
    <h2 class="text-lg font-bold mb-4 pb-3 border-b">Tóm tắt đơn hàng</h2>
    
    <!-- Danh sách sản phẩm trong giỏ hàng -->
    {#if cartItems.length === 0}
      <p class="text-gray-500 py-4 text-center">Giỏ hàng của bạn đang trống</p>
    {:else}
      <div class="max-h-[300px] overflow-y-auto mb-4">
        {#each cartItems as item (item.id)}
          <div class="flex items-start py-3 border-b" transition:fade={{ duration: 200 }}>
            <div class="w-16 h-16 bg-gray-200 rounded-md mr-3 overflow-hidden">
              <img src={item.image} alt={item.title} class="w-full h-full object-cover" />
            </div>
            <div class="flex-1">
              <p class="font-medium text-sm">{item.title}</p>
              <div class="flex text-xs font-medium text-gray-600 flex-wrap">
                {#each item.options as option}
                  <div class="mr-1">{option}</div>
                {/each}
              </div>
              <div class="flex justify-between mt-1 text-sm">
                <span>SL: {item.quantity}</span>
                <span class="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Tổng kết đơn hàng -->
      <div class="py-3 border-b">
        <div class="flex justify-between mb-2 text-sm">
          <span>Tạm tính</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div class="flex justify-between mb-2 text-sm">
          <span>Phí vận chuyển</span>
          <span class="text-green-600">Miễn phí</span>
        </div>
        <div class="flex justify-between mb-2 text-sm">
          <span>Thuế</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div class="flex justify-between py-3 font-bold">
        <span>Tổng cộng</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <!-- Nút thanh toán (chỉ hiển thị trên mobile) -->
      <button class="lg:hidden mt-4 w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
        Tiến hành thanh toán
      </button>
    {/if}
    
    <!-- Thông tin bảo mật -->
    <div class="mt-6 text-center text-xs text-gray-500">
      <p>Thanh toán an toàn và được bảo mật</p>
      <div class="mt-2">
        <img src="https://www.usapomshop.com/assets/brands.png" alt="Payment methods" class="max-w-full" />
      </div>
    </div>
  </div>

  <!-- Phiên bản di động của giỏ hàng - Chỉ hiển thị trên điện thoại -->
  <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40">
    <div class="flex justify-between items-center mb-2">
      <span class="font-medium">Tổng cộng:</span>
      <span class="font-bold text-lg">${totalPrice.toFixed(2)}</span>
    </div>
    <button class="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
      Tiến hành thanh toán
    </button>
  </div>
</div>

<style>
  input[type='checkbox'] {
    border: none;
  }
</style>