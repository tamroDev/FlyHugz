<script lang="ts">
  import { PlayIcon } from 'lucide-svelte';

  export let url_video = '';

  let videoElement: HTMLVideoElement;
  let showControls = false;

  function handlePlay() {
    if (videoElement) {
      videoElement.play();
      showControls = true;
    }
  }

  function handlePause() {
    showControls = false;
  }
</script>

<div class="relative">
  <!-- svelte-ignore a11y_media_has_caption -->
  <video
    bind:this={videoElement}
    class="h-full max-w-full"
    controls={showControls}
    on:pause={handlePause}
  >
    <source src={url_video} type="video/mp4" />
    <track />
  </video>

  {#if !showControls}
    <button
      on:click={handlePlay}
      class="duration-400 absolute left-[50%] top-[50%] flex size-[30px] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-[#b9b9b99e] transition-all md:size-[60px]"
    >
      <PlayIcon class="size-[20px] fill-white text-white md:size-[24px]" />
    </button>
  {/if}
</div>
