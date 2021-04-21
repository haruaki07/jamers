<script lang="ts">
  import { css } from "twind/css";
  import { theme, tw } from "twind";
  import Button from "~/libs/Button";
  import { muteBgm, playBgm, bgmPlaying } from "~/sounds";
  import ButtonBack from "~/libs/ButtonBack.svelte";

  const style = tw(
    css({
      zIndex: 1,
      "@apply":
        "w-full h-screen text-center relative select-none py-24 sm:py-4 lg:py-24 flex flex-col",
      ".title": {
        textShadow: `0 4px 1px ${tw(theme("colors", ["red", "900"]))}`,
        "@apply": "text(white 5xl) sm:text-6xl font-black",
      },
      button: {
        "@apply":
          "mt-24 rounded-lg p-3 text-white font-bold w-min mx-auto shadow-xl",
        "&.off": {
          "@apply": "bg-red-600",
        },
        "&.on": {
          "@apply": "bg-green-600",
        },
      },
    })
  );
</script>

<ButtonBack url="/" />

<div class={style}>
  <h1 class="title">Pengaturan</h1>
  {#if $bgmPlaying}
    <Button on:click={muteBgm} class="off">Musik</Button>
  {:else}
    <Button on:click={playBgm} class="on">Musik</Button>
  {/if}
</div>
