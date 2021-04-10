<script lang="ts">
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import DropZone from "./DropZone.svelte";
  import { tw, css } from "twind/css";

  type DndEvt = CustomEvent<DndEvent<typeof items>>;

  let items = [
    { id: 1, value: "semar", color: "red-500" },
    { id: 2, value: "gareng", color: "blue-500" },
    { id: 3, value: "petruk", color: "green-500" },
    { id: 4, value: "bagong", color: "yellow-500" },
  ];

  const flipDurationMs = 300;

  function handleDndConsider(e: DndEvt) {
    items = e.detail.items;
  }

  function handleDndFinalize(e: DndEvt) {
    items = e.detail.items;
  }

  const style = tw(css`
    @apply relative w-full h-screen;

    .wrapper {
      @apply fixed bottom-0 left-0 right-0 w-full flex items-center;
      @apply p-2 space-x-4 bg-white overflow-x-auto h-16;
    }
    .item {
      @apply w-12 h-12 rounded-full;
    }
  `);
</script>

<div class={style}>
  <DropZone
    x={100}
    y={0}
    value="semar"
    itemClass="bg-white"
    wrapperClass="bg-red-500"
  />
  <DropZone
    x={0}
    y={100}
    value="gareng"
    itemClass="bg-white"
    wrapperClass="bg-blue-500"
  />
  <DropZone
    x={100}
    y={100}
    value="petruk"
    itemClass="bg-white"
    wrapperClass="bg-green-500"
  />
  <DropZone
    x={0}
    y={0}
    value="bagong"
    itemClass="bg-white"
    wrapperClass="bg-yellow-500"
  />

  <div
    class="wrapper"
    use:dndzone={{ items, flipDurationMs }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each items as item (item.id)}
      <div
        class="item {tw`bg-${item.color}`}"
        animate:flip={{ duration: flipDurationMs }}
      />
    {/each}
  </div>
</div>

<style>
  * {
    outline: none !important;
  }
</style>
