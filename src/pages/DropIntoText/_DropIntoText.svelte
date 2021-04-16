<script lang="ts">
  import { Droppable } from "@shopify/draggable";
  import { onMount } from "svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { tw, css } from "twind/css";
  import data from "./data";
  import DropZone from "./DropZone.svelte";

  function getChoice(id: number) {
    return data.choices.find((choice) => choice.id === id);
  }

  function measureTextWidth(node: HTMLElement) {
    const rect = node.getBoundingClientRect();
    const width = rect.width + "px";
    const height = rect.height + "px";
    node.innerHTML = "";
    node.style.width = width;
    node.style.height = height;
    node.style.padding = "0";
  }

  let choices = [...data.choices];

  $: question = data.question.split(/\[([0-9]+)\]/g);

  function handleConsider(e) {
    const dropped = e.detail.items.sort((a, b) => a.id - b.id);
    choices = e.detail.items;
  }

  function handleFinalize(e) {
    const dropped = e.detail.items.sort((a, b) => a.id - b.id);
    choices = e.detail.items;
  }
</script>

<div>
  <DropZone max={1} value="tai" />

  <div
    class={tw`overflow-x-auto h-20 w-full bg-white flex items-center space-x-4`}
    use:dndzone={{ items: choices, flipDurationMs: 300 }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
  >
    {#each choices as choice (choice.id)}
      <div class={tw`bg-gray-200 p-3`} animate:flip={{ duration: 300 }}>
        {choice.text}
      </div>
    {/each}
  </div>
</div>
