<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { css } from "twind/css";
  import { tw } from "twind";
  import { onDestroy } from "svelte";
  import { preload } from "~/preloader";

  const { getAssetResult } = preload;

  export let dialogClass = "";
  export let open = false;
  export let backdrop = false;
  export let title = "";
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
    overlay: tw("fixed inset-0 bg-black bg-opacity-10"),
    dialog: tw(
      css({
        "@apply": `w-full relative z-10 rounded-md pb-3 pt-5 pr-2`,
        backgroundImage: `url(${getAssetResult("window").url})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "top left",
        minHeight: "200px",
        ".title": {
          "@apply":
            "w-[80%] absolute -top-8 left-[50%] h-14 transform -translate-x-1/2 text(white center 4xl) mr-2 leading-none",
          backgroundImage: `url(${getAssetResult("pita").url})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "top left",
          fontFamily: "Brady Bunch Remastered",
          textShadow: "0 1px 1px black",
        },
      }),
      dialogClass
    ),
  };

  function closeModal() {
    open = false;
  }

  onDestroy(() => {
    open && closeModal();
  });
</script>

{#if open}
  <div class={style.wrapper}>
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
      <div class="title">{title}</div>
      <slot />
    </div>
  </div>
{/if}
