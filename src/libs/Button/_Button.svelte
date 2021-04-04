<script lang="ts">
  import { tw } from "twind";

  export let override = false;
  export let href: string = "";
  export let color = "gray";

  let className = "";
  export { className as class };

  let colorClass = "bg-gray-900 ring-gray-300 text-white";

  $: switch (color) {
    case "indigo":
      colorClass = "bg-indigo-500 ring-indigo-200 text-white";
      break;
    default:
      colorClass = "bg-gray-800 ring-gray-300 text-white";
      break;
  }

  $: style = tw(
    {
      [`py-2 px-4 ${colorClass} rounded-lg focus:(ring outline-none) inline-block`]: !override,
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
