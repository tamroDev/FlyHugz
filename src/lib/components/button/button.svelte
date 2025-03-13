<script lang="ts">
  export let style = ""
</script>


<button class={`px-4 py-2 bg-button-background text-white ${style}`}>
  <slot />
</button>