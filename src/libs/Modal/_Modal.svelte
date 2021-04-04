<script context="module" lang="ts">
  import { writable } from "svelte/store";

  export const modalContent = writable<any>(null);
  export const modalOpen = writable(false);
  export const modalDialogClass = writable("");
  export const loadingContent = writable<any>("Loading...");

  export function closeModal() {
    modalContent.set(null);
    modalOpen.set(false);
    modalDialogClass.set("");
    loadingContent.set("Loading...");
  }

  export function modalEscape(_node: HTMLElement) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        modalContent.set(null);
        modalOpen.set(false);
      }
    };

    document.addEventListener("keydown", handleEscape, false);

    return {
      destroy() {
        document.removeEventListener("keydown", handleEscape, false);
      },
    };
  }
</script>

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { css } from "twind/css";
  import { tw } from "twind";
  import { onDestroy } from "svelte";
  import { is_promise } from "svelte/internal";

  $: style = {
    wrapper: tw(
      css({
        scrollbarWidth: "none",
        overscrollBehaviorY: "contain",
        "@apply":
          "fixed inset-0 flex items-start justify-center p-3 z-50 overflow-y-auto",
        "&::-webkit-scrollbar": {
          width: 0,
        },
      })
    ),
    overlay: tw("absolute inset-0 bg-black bg-opacity-25"),
    dialog: tw`bg-white w-full shadow relative z-10 rounded-md mt-12 ${$modalDialogClass}`,
  };

  onDestroy(() => {
    $modalOpen && closeModal();
  });
</script>

{#if $modalOpen}
  <div class={style.wrapper}>
    <div
      class={style.overlay}
      transition:fade={{ duration: 150 }}
      on:click={closeModal}
    />
    <div class={style.dialog} transition:fly={{ y: -50, duration: 150 }}>
      {#if typeof $modalContent === "string"}
        {$modalContent}
      {:else if is_promise($modalContent)}
        {#await $modalContent.then ? $modalContent : $modalContent()}
          <div class="text-center">
            {#if typeof $loadingContent === "string"}
              {$loadingContent}
            {:else}
              <svelte:component this={$loadingContent} />
            {/if}
          </div>
        {:then cmp}
          <svelte:component this={cmp.default} />
        {/await}
      {:else}
        <svelte:component this={$modalContent} />
      {/if}
    </div>
  </div>
{/if}
