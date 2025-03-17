<script lang="ts">
  import { onMount } from 'svelte';
  
  // State để theo dõi mục đang mở
  let activeIndex: number | null = null;
  
  // Các phần tử DOM
  let accordionItems: HTMLElement[] = [];
  let promtElements: HTMLElement[] = [];
  
  // Hàm toggle đóng/mở accordion
  function toggleItem(index: number, event: MouseEvent): void {
    // Ngăn sự kiện lan truyền nếu click vào nội dung
    const target = event.target as HTMLElement;
    if (target.closest('.promt') && !target.closest('.title')) {
      return;
    }
    
    // Nếu click vào mục đang mở, đóng nó lại
    if (activeIndex === index) {
      closeItem(index);
      activeIndex = null;
    } else {
      // Đóng mục đang mở (nếu có)
      if (activeIndex !== null) {
        closeItem(activeIndex);
      }
      
      // Mở mục mới
      openItem(index);
      activeIndex = index;
    }
  }
  
  // Mở một mục accordion
  function openItem(index: number): void {
    if (!promtElements[index]) return;
    
    const promt = promtElements[index];
    const img = accordionItems[index].querySelector('.plus img') as HTMLImageElement;
    const title = accordionItems[index].querySelector('.title') as HTMLElement;
    
    // Thiết lập chiều cao chính xác dựa trên nội dung
    const contentHeight = promt.scrollHeight;
    promt.style.maxHeight = contentHeight + 16 + 'px'; // Thêm padding-bottom
    promt.classList.add('open');
    
    // Thay đổi icon và style
    if (img) img.src = 'https://bleame.vercel.app//assets/images/minus.png';
    if (title) title.classList.add('active');
  }
  
  // Đóng một mục accordion
  function closeItem(index: number): void {
    if (!promtElements[index]) return;
    
    const promt = promtElements[index];
    const img = accordionItems[index].querySelector('.plus img') as HTMLImageElement;
    const title = accordionItems[index].querySelector('.title') as HTMLElement;
    
    promt.style.maxHeight = '0';
    promt.classList.remove('open');
    
    // Thay đổi icon và style
    if (img) img.src = 'https://bleame.vercel.app//assets/images/plus.png';
    if (title) title.classList.remove('active');
  }
  
  // Xử lý khi component được mount
  onMount(() => {
    // Lấy tất cả các phần tử từ DOM sau khi component đã render
    accordionItems = Array.from(document.querySelectorAll('.arcodion-item'));
    promtElements = Array.from(document.querySelectorAll('.promt'));
    
    // Đảm bảo tất cả các mục đều đóng khi khởi tạo
    promtElements.forEach((promt, index) => {
      promt.style.maxHeight = '0';
    });
  });
</script>

<div class="arcodion">
  <div class="arcodion-item" on:click={(e) => toggleItem(0, e)}>
    <div class="title">
      <h1>Where can I use Bleame?</h1>
      <div class="plus">
        <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="plus" />
      </div>
    </div>
    <div class="promt">
      You can use your Bleame on just about any part of your body below the cheeks, including
      the bikini area and face! Its completely safe to use!
    </div>
  </div>
  
  <div class="arcodion-item" on:click={(e) => toggleItem(1, e)}>
    <div class="title">
      <h1>How does it work?</h1>
      <div class="plus">
        <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="plus" />
      </div>
    </div>
    <div class="promt">
      Using Nano-Crystalline technology, Bleame™ Crystal Hair Eraser allows the hair to clump
      and break from the surface when rubbed gently on the skin. This process also helps
      exfoliate, revealing baby smooth skin after use 💜
    </div>
  </div>
  
  <div class="arcodion-item" on:click={(e) => toggleItem(2, e)}>
    <div class="title">
      <h1>Does it help against strawberry skin & bumps?</h1>
      <div class="plus">
        <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="plus" />
      </div>
    </div>
    <div class="promt">
      Absolutely! Bleame effectively improves the appearance of strawberry skin and razor
      bumps, which are commonly caused by waxing and shaving.
    </div>
  </div>
  
  <div class="arcodion-item" on:click={(e) => toggleItem(3, e)}>
    <div class="title">
      <h1>Shipping & Delivery</h1>
      <div class="plus">
        <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="plus" />
      </div>
    </div>
    <div class="promt">
      Shipping Information: We process orders within 1-2 business days from our US warehouse.
      After dispatch, the estimated delivery time varies based on the shipping method you
      choose, generally taking up to 2 days.
    </div>
  </div>
  
  <div class="arcodion-item" on:click={(e) => toggleItem(4, e)}>
    <div class="title">
      <h1>Return & Refund Policy</h1>
      <div class="plus">
        <img loading="lazy" src="https://bleame.vercel.app//assets/images/plus.png" alt="plus" />
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

<style>
  .arcodion-item {
    overflow: hidden;
    height: auto;
    border-bottom: 1px solid #d9d9d9;
    cursor: pointer;
  }

  .arcodion-item .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    font-size: 17px;
    font-weight: 600;
    line-height: var(--primary-lineHeight, 1.5);
  }

  .title.active {
    color: #8577bc;
  }

  .promt {
    font-size: 14px;
    line-height: 1.6;
    color: rgb(46, 42, 57);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out, padding 0.3s ease-out;
    padding: 0;
  }

  .promt.open {
    padding-bottom: 16px;
  }

  .plus,
  .minus {
    max-width: 15px;
  }
</style>