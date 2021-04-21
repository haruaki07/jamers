<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { tw, css } from "twind/css";
  import Button from "~/libs/Button";
  import { bgmPlaying, muteBgm, playBgm } from "~/sounds";

  const dispatch = createEventDispatcher();

  const style = css({
    "@apply": `flex(& col) space-y-3 m-4 p-3 bg-window-content rounded-md`,
    button: {
      "@apply": "w-1/3 font-medium text-white rounded-md p-2 w-full",
    },
  });
</script>

<div class={tw(style)}>
  {#if $bgmPlaying}
    <Button class={tw`bg-blue(600 hover:700)`} on:click={muteBgm}>
      Matikan musik
    </Button>
  {:else}
    <Button class={tw`bg-gray(600 hover:700)`} on:click={playBgm}>
      Nyalakan musik
    </Button>
  {/if}
  <Button
    class={tw`bg-green(600 hover:700)`}
    on:click={() => dispatch("resume")}
  >
    Lanjut
  </Button>
  <Button
    class={tw`bg-blue(600 hover:700)`}
    on:click={() => dispatch("restart")}
  >
    Ulangi
  </Button>
  <Button class={tw`bg-red(600 hover:700)`} on:click={() => dispatch("exit")}>
    Keluar
  </Button>
</div>
