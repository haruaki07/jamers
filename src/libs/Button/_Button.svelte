<script lang="ts">
  import { tw } from "twind";

  export let override = false;
  export let href: string = "";
  export let color = "gray-800";
  export let block = false;

  let className = "";
  export { className as class };

  let colorClass = `bg-${color} ring-${color} border-${color} text-white`;

  $: style = tw(
    colorClass,
    {
      [`py-1 px-3 rounded focus:(ring-2 border-white outline-none) inline-block text(white sm) border`]: !override,
      "w-full": block,
    },
    className
  );
</script>

{#if !href}
  <button {...$$restProps} on:click class={style}>
    <slot />
  </button>
{:else}
  <a {href} class={style} on:click {...$$restProps}>
    <slot />
  </a>
{/if}
