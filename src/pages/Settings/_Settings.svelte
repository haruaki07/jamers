<script lang="ts">
  import { css } from "twind/css";
  import { tw } from "twind";
  import PushButton from "~/libs/PushButton";
  import { muteBgm, playBgm, bgmPlaying, enableSoundEffect } from "~/sounds";
  import ButtonBack from "~/libs/ButtonBack.svelte";
  import PageTitle from "~/libs/PageTitle.svelte";

  const style = tw(
    css({
      zIndex: 1,
      "@apply": "page-wrapper",
      ".options": {
        "@apply": "mt-16 max-w-sm place-self-center flex(& col) space-y-6",
      },
    })
  );
</script>

<ButtonBack url="/" />

<div class={style}>
  <PageTitle>Pengaturan</PageTitle>
  <div class="options">
    <!-- BGM -->
    <div>
      {#if $bgmPlaying}
        <PushButton on:click={muteBgm} variant="red">Music OFF</PushButton>
      {:else}
        <PushButton on:click={playBgm} variant="green">Music ON</PushButton>
      {/if}
    </div>

    <!-- SOUND EFFECT -->
    <div>
      {#if $enableSoundEffect}
        <PushButton on:click={() => ($enableSoundEffect = false)} variant="red"
          >sound OFF</PushButton
        >
      {:else}
        <PushButton on:click={() => ($enableSoundEffect = true)} variant="green"
          >sound ON</PushButton
        >
      {/if}
    </div>
  </div>
</div>
