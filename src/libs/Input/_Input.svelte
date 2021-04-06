<script lang="ts">
  import { onMount } from "svelte";
  import { tw } from "twind";

  export let value = "";
  export let placeholder = "";
  export let type = "text";
  export let textarea = false;
  export let rows = 2;
  export let block = false;
  let className = "";
  export { className as class };

  let el: HTMLInputElement;

  $: style = tw(`p-1 rounded text-sm appearance-none block`, className, {
    "w-full": block,
  });

  onMount(() => {
    if (!textarea) el.type = type;
  });
</script>

{#if textarea}
  <textarea bind:value {...$$restProps} class={style} {placeholder} {rows} />
{:else}
  <input
    bind:value
    bind:this={el}
    {...$$restProps}
    class={style}
    {placeholder}
  />
{/if}
