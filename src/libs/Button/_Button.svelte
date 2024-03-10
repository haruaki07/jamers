<script lang="ts">
  import { playAudio, sounds } from "~/sounds";

  const clickSound = $sounds["btnClick"];

  let className = "";
  export { className as class };
  export let href = null;

  function handleMouseDown() {
    playAudio("btnClick");
  }

  function handleMouseLeave() {
    clickSound?.stop();
  }
</script>

{#if href}
  <a
    {...$$restProps}
    {href}
    class={className}
    on:click
    on:pointerdown
    on:pointerup
    on:pointerleave
    on:mousedown={handleMouseDown}
    on:mouseleave={handleMouseLeave}
  >
    <slot />
  </a>
{:else}
  <button
    {...$$restProps}
    class={className}
    on:click
    on:pointerdown
    on:pointerup
    on:pointerleave
    on:mousedown={handleMouseDown}
    on:mouseleave={handleMouseLeave}
  >
    <slot />
  </button>
{/if}

<style>
  a,
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
