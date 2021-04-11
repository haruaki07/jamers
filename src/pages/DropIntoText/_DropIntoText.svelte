<script lang="ts">
  import { Droppable } from "@shopify/draggable";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { tw, css } from "twind/css";
  import data from "./data";

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

  function dropintotext(node: HTMLElement) {
    const containers = node.querySelectorAll(".container");

    if (!containers.length) return;

    const droppable = new Droppable(containers, {
      draggable: ".choice",
      dropzone: ".dropzone",
    });

    let droppableOrigin: string;

    droppable.on("drag:start", (evt) => {
      droppableOrigin = evt.originalSource.dataset.id;
    });

    droppable.on("droppable:dropped", (evt) => {
      const dropzoneEl = evt.dropzone;
      if (droppableOrigin !== dropzoneEl.dataset.id) {
        evt.cancel();
        return;
      }
      const id = +droppableOrigin;
    });

    return {
      destroy() {
        droppable.destroy();
      },
    };
  }

  $: question = data.question.split(/\[([0-9]+)\]/g);
</script>

<div use:dropintotext>
  <div class="{tw`bg-white p-6 rounded-lg flex items-center`} container">
    {#each question as q}
      {#if q.match(/[0-9+]/)}
        <span
          use:measureTextWidth
          data-id={q}
          class="{tw`bg-gray-300 p-1.5 inline-block`} dropzone"
        >
          {getChoice(+q).text}
        </span>
      {:else}
        <span class={tw`p-1.5 inline-block`}>{q}</span>
      {/if}
    {/each}
  </div>

  <div
    class="{tw`flex items-center flex-wrap space-x-4 mt-12 bg-white p-6`} container"
  >
    {#each choices as c (c.id)}
      <div class="dropzone" animate:flip>
        <span
          class="{tw`inline-block bg-gray-300 p-1.5`} choice"
          data-id={c.id}
        >
          {c.text}
        </span>
      </div>
    {/each}
  </div>
</div>
