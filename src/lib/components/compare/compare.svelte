<script lang="ts">
  import { onMount } from 'svelte';

  // Khai báo các biến để theo dõi trạng thái
  let imgCompare: HTMLElement;
  let divider: HTMLElement;
  let afterImage: HTMLElement;
  
  let isDragging = false;
  let percent = 50; // Giá trị mặc định là 50%

  // Hàm bắt đầu kéo
  function startDrag() {
    isDragging = true;
    document.body.style.cursor = "ew-resize";
  }

  // Hàm xử lý khi kéo
  function onDrag(event: MouseEvent | TouchEvent) {
    if (!isDragging) return;

    const rect = imgCompare.getBoundingClientRect();
    const clientX = 
      'clientX' in event ? event.clientX : event.touches[0].clientX;
    const offsetX = clientX - rect.left;
    percent = (offsetX / rect.width) * 100;

    // Giới hạn phần trăm trong khoảng 0-100
    percent = Math.max(0, Math.min(100, percent));

    // Cập nhật giao diện 
    updateImageComparison();
  }

  // Hàm kết thúc kéo
  function stopDrag() {
    isDragging = false;
    document.body.style.cursor = "default";
  }

  // Hàm cập nhật giao diện so sánh
  function updateImageComparison() {
    if (afterImage && divider) {
      afterImage.style.width = `${percent}%`;
      divider.style.left = `${percent}%`;
    }
  }

  onMount(() => {
    // Thêm các event listener cho document
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", stopDrag);

    // Khởi tạo vị trí ban đầu
    updateImageComparison();

    // Dọn dẹp event listeners khi component bị hủy
    return () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("touchend", stopDrag);
    };
  });
</script>

<div class="wrapper-compare">
  <div class="container-page compare-container">
    <div class="compare_text">
      <h1>Hair removal just got waaaaay easier</h1>
      <p>
        Meet Bleame Crystal Hair Eraser – the easiest, painless hair
        removal for a smooth skin instantly!
      </p>
    </div>
    <div class="compare_content">
      <div class="col-1">
        <div>
          <div class="before_img_compare">
            <img
              loading="lazy"
              src="https://bleame.vercel.app/assets/images/icon_compare_1.webp"
              alt="Easy to use icon"
            />
          </div>
          <div class="text_col">
            <h1>Easy to Use</h1>
            <p>
              Simply rub it to your skin in circular motion for a
              hair-free body!
            </p>
          </div>
        </div>
        <div>
          <div class="before_img_compare">
            <img
              loading="lazy"
              src="https://bleame.vercel.app/assets/images/icon_compare_2.webp"
              alt="Long lasting icon"
            />
          </div>
          <div class="text_col">
            <h1>Long Lasting</h1>
            <p>
              No refills or recharges required and it is reusable up to 1
              year.
            </p>
          </div>
        </div>
      </div>
      <div class="img_compare" bind:this={imgCompare}>
        <div class="after" bind:this={afterImage}></div>
        <div class="before"></div>
        <div 
          class="divider" 
          bind:this={divider} 
          on:mousedown={startDrag}
          on:touchstart|preventDefault={startDrag}
        >
          <div class="handle">
            <div class="arrow">
              <img src="https://bleame.vercel.app/assets/images/prev.png" alt="Previous" />
              <img src="https://bleame.vercel.app/assets/images/next.png" alt="Next" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-1">
        <div>
          <div class="before_img_compare">
            <img
              loading="lazy"
              src="https://bleame.vercel.app/assets/images/icon_compare_3.webp"
              alt="Travel safe icon"
            />
          </div>
          <div class="text_col">
            <h1>Travel Safe</h1>
            <p>
              Unlike shavers, you can take Bleame with you wherever you
              go.
            </p>
          </div>
        </div>
        <div>
          <div class="before_img_compare">
            <img
              loading="lazy"
              src="https://bleame.vercel.app/assets/images/icon_compare_2.webp"
              alt="Hair growth icon"
            />
          </div>
          <div class="text_col">
            <h1>Slows Hair Growth</h1>
            <p>
              Designed to slow down hair regrowth in just a couple of
              sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .wrapper-compare {
    width: 100%;
  }

  .compare-container {
    margin-block-end: 48px;
    margin-block-start: 48px;
    display: flex;
    flex-direction: column;
  }

  .compare_text {
    text-align: center;
  }

  .compare_text h1 {
    color: var(--primary-color);
    font-size: 36px;
    line-height: var(--second-lineHeight);
    margin-bottom: 20px;
  }

  .compare_text p {
    font-size: 21px;
    line-height: 1.52;
    color: #625f6b;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .compare_content {
    margin-top: 50px;
    display: flex;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: space-between;
  }

  .img_compare {
    width: 512px;
    height: 512px;
    border-radius: 100%;
    position: relative;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
  }

  .img_compare .after {
    background-image: url("https://bleame.vercel.app/assets/images/prevCompare.webp");
    position: absolute;
    inset: 0;
    z-index: 990;
    width: 50%;
  }

  .img_compare .before {
    background-image: url("https://bleame.vercel.app/assets/images/nextCompare.jpg");
    position: absolute;
    inset: 0;
    z-index: 989;
  }

  .divider {
    position: absolute;
    left: 50%;
    top: 0;
    width: 2px;
    height: 100%;
    background: white;
    transform: translateX(-50%);
    z-index: 991;
    cursor: ew-resize;
  }

  .handle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 992;
  }

  .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 20px;
    pointer-events: none;
  }

  .col-1 {
    width: 25%;
    padding: 0 15px;
  }

  .col-1 > div {
    display: flex;
    margin-bottom: 30px;
    position: relative;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .col-1 > div .before_img_compare {
    max-width: 44px;
    flex: 0 0 44%;
  }

  .col-1 > div .before_img_compare img {
    max-width: 60px;
    display: block;
    width: 100%;
    height: 60px;
    object-fit: cover;
  }

  .text_col {
    text-align: center;
  }

  .text_col h1 {
    font-size: 19px;
    font-weight: bold;
    margin-bottom: 5px;
    line-height: var(--primary-lineHeight);
  }

  .text_col p {
    font-size: 18px;
    color: #2e2a39bf;
    line-height: var(--primary-lineHeight);
  }

  .container-page {
    padding-inline: 3rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 1200px) {
    .img_compare {
      order: 1;
      height: 500px;
      width: 500px;
    }

    .compare_content .col-1 {
      order: 2;
      width: 40%;
    }
  }
  @media (max-width: 768px) {
    .img_compare {
      order: 1;
      width: 100%;
      height: unset;
      padding-top: 100%;
      margin: 10px 0 20px 0;
    }

    .compare_content {
      flex-wrap:wrap;
    }

    .compare_content .col-1 {
      order: 2;
      width: 100%;
    }
  }
  @media (max-width: 1000px) {
    .compare_content {
      justify-content: center;
    }

    .img_compare {
      order: 1;
    }

    .compare_content .col-1 {
      order: 2;
    }
  }
</style>