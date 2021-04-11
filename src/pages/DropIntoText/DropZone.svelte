<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import type { Options } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { tw } from "twind";

  type DndEvt = CustomEvent<DndEvent<any[]>>;

  export let max = 1;
  export let value = "";
  export let x = 0;
  export let y = 0;
  export let wrapperClass = "";
  export let itemClass = "";
  export let disabled = false;

  let items = [];

  function onConsider(e: DndEvt) {
    const dropped = e.detail.items;
    if (dropped[0].value !== value) {
      disabled = true;
      return;
    }
    items = e.detail.items;
  }

  function onFinalize(e: DndEvt) {
    const dropped = e.detail.items;
    if (dropped[0].value !== value) {
      disabled = true;
      return;
    }
    items = dropped;
  }

  $: dropFromOthersDisabled = disabled || items.length >= max;
  $: opts = {
    items,
    flipDurationMs: 300,
    dropFromOthersDisabled,
  };
  $: wrapperStyle = tw(`h-12 w-12 overflow-auto flex absolute ${wrapperClass}`);
  $: itemStyle = tw(`w-12 h-12 rounded-full ${itemClass}`);
</script>

<div
  class={wrapperStyle}
  use:dndzone={opts}
  on:consider={onConsider}
  on:finalize={onFinalize}
  style="left: {x}px; top: {y}px"
>
  {#each items as item (item.id)}
    <div class={itemStyle} animate:flip={{ duration: 300 }} />
  {/each}
</div>
