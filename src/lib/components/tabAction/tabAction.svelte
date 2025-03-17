<script lang="ts">
  import { onMount } from 'svelte';

  interface IActionMedia {
    id: string;
    src: string;
  }

  const arrMedia: IActionMedia[] = [
    {
      id: "bikini",
      src: "https://bleame.vercel.app/assets/images/bikini.mp4",
    },
    {
      id: "legs",
      src: "https://bleame.vercel.app/assets/images/legs.mp4",
    },
    {
      id: "arm",
      src: "https://bleame.vercel.app/assets/images/arm.mp4",
    },
    {
      id: "back",
      src: "https://bleame.vercel.app/assets/images/back.mp4",
    },
  ];

  // Theo dõi tab đang active và nguồn video
  let activeTab = "bikini";
  let currentVideoSrc = arrMedia[0].src;
  let videoOpacity = 1;
  let videoElement: HTMLVideoElement;

  function changeTab(tabId: string) {
    const tabIndex = arrMedia.findIndex(media => media.id === tabId);
    if (tabIndex === -1) return;
    
    activeTab = tabId;
    videoOpacity = 0;
    
    // Sử dụng setTimeout để thay đổi nguồn video sau khi mờ dần
    setTimeout(() => {
      currentVideoSrc = arrMedia[tabIndex].src;
    }, 200);
  }

  // Xử lý sự kiện video đã tải để hiện dần
  function onVideoLoaded() {
    videoOpacity = 1;
  }
</script>

<div class="wrapper-action">
  <section class="container-page action-container">
    <div class="tab-action">
      <div class="text_action">
        <h1>See it in action.</h1>
        <span> No matter the terrain, the eraser hugs your curves. </span>
      </div>
      <ul>
        {#each arrMedia as media}
          <li 
            class={activeTab === media.id ? "active" : ""} 
            on:click={() => changeTab(media.id)}
          >
            {media.id.charAt(0).toUpperCase() + media.id.slice(1)}
          </li>
        {/each}
      </ul>
    </div>
    <div class="media-action">
      <video
        bind:this={videoElement}
        loop
        muted
        autoplay
        preload="none"
        src={currentVideoSrc}
        style="opacity: {videoOpacity}"
        on:loadeddata={onVideoLoaded}
      ></video>
    </div>
  </section>
</div>

<style>
  .wrapper-action {
  padding-block-end: 50px;
  padding-block-start: 50px;
}
.action-container {
  padding-left: 40px;
  padding-right: 40px;
}

.tab-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-action .text_action {
  font-size: 40px;
  line-height: 51px;
  max-width: 475px;
  margin-bottom: 30px;
}

.tab-action h1 {
  color: #000;
  width: max-content;
  display: inline;
}

.tab-action .text_action span {
  font-weight: 200 !important;
  font-style: italic;
}

.tab-action ul {
  display: flex;
  align-items: center;
  border: 1px solid #dedede;
  padding: 5px;
  border-radius: 10px;
}

.tab-action ul li {
  padding: 6px 22px;
  color: #7d75be;
  cursor: pointer;
  font-size: 17px;
}

.tab-action ul li.active {
  background-color: #7d75be;
  color: white;
  border-radius: 8px;
}

.media-action {
  margin-top: 20px;
  position: relative;
}

.media-action video {
  border-radius: 25px;
  width: 100%;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.container-page {
  padding-inline: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 950px) {
  .container-page {
    padding-inline: 2rem;
  }
}

@media (max-width: 550px) {
  .container-page {
    padding-inline: 1rem;
  }
}

@media (max-width: 1000px) {
  .wrapper-action {
    padding: 0;
  }

  .tab-action {
    flex-wrap: wrap;
  }

  .tab-action .text_action {
    font-size: 30px;
    line-height: 41px;
    margin-bottom: 20px;
  }
}
</style>