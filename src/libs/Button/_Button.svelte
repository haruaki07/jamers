<script lang="ts">
  import { sounds } from "~/sounds";

  const hoversound = $sounds["menuhover"];

  let className = "";
  export { className as class };
  export let href = null;

  function handleMouseUp() {
    hoversound.play();
  }

  function handleMouseLeave() {
    hoversound.stop();
  }
</script>

{#if href}
  <a
    {...$$restProps}
    {href}
    class={className}
    on:click
    on:mouseup={handleMouseUp}
    on:mouseleave={handleMouseLeave}
  >
    <slot />
  </a>
{:else}
  <button
    {...$$restProps}
    class={className}
    on:click
    on:mouseup={handleMouseUp}
    on:mouseleave={handleMouseLeave}
  >
    <slot />
  </button>
{/if}
