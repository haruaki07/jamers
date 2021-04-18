<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { css } from "twind/css";
  import { tw } from "twind";
  import { onDestroy } from "svelte";

  export let dialogClass = "";
  export let open = false;
  export let backdrop = false;
  export let trapFocus = false;
  export let vAlign: "start" | "center" | "end" = "center";

  $: style = {
    wrapper: tw(
      css({
        scrollbarWidth: "none",
        overscrollBehaviorY: "contain",
        "@apply":
          "fixed inset-0 flex justify-center p-3 z-[99999] overflow-y-auto",
        "&::-webkit-scrollbar": {
          width: 0,
        },
      }),
      `items-${vAlign}`
    ),
    overlay: tw("fixed inset-0 bg-black bg-opacity-25"),
    dialog: tw`bg-white w-full shadow relative z-10 rounded-md${dialogClass}`,
  };

  export function withTrapFocus(node: HTMLElement) {
    if (!trapFocus) return;
    const focusableElements =
      node.children.length &&
      (node.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLInputElement>);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      // is Tab key not pressed
      if (e.key !== "Tab" || e.keyCode !== 9) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleTab, false);

    return {
      destroy() {
        document.removeEventListener("keydown", handleTab, false);
      },
    };
  }

  function closeModal() {
    open = false;
  }

  onDestroy(() => {
    open && closeModal();
  });
</script>

{#if open}
  <div class={style.wrapper} use:withTrapFocus>
    <div
      class={style.overlay}
      transition:fade={{ duration: 150 }}
      on:click={() => backdrop && closeModal()}
    />
    <div
      class={style.dialog}
      transition:fly={{ y: -50, duration: 150 }}
      on:introstart
      on:outrostart
      on:introend
      on:outroend
    >
      <slot />
    </div>
  </div>
{/if}
