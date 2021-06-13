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
        "@apply":
          "mt-16 max-w-sm sm:max-w-lg place-self-center space-y-6 font-nunito overflow-y-auto h-full",
        ".title": {
          "@apply":
            "text(lg white center) font-bold mb-6 bg-black bg-opacity-75 p-1 w-full rounded-lg",
        },
        ".switches": {
          "@apply": "flex space-x-4",
        },
      },
    })
  );
</script>

<ButtonBack url="/" />

<div class={style}>
  <PageTitle twClass="uppercase">Pengaturan</PageTitle>
  <div class="options">
    <!-- BGM -->
    <div>
      <h3 class="title">Musik</h3>
      <div class="switches">
        <PushButton
          twClass="text-base"
          on:click={muteBgm}
          disabled={$bgmPlaying === false}
          variant="red"
        >
          OFF
        </PushButton>
        <PushButton
          twClass="text-base"
          on:click={playBgm}
          disabled={$bgmPlaying === true}
          variant="green"
        >
          ON
        </PushButton>
      </div>
    </div>

    <!-- SOUND EFFECT -->
    <div>
      <h3 class="title">Efek Suara</h3>
      <div class="switches">
        <PushButton
          twClass="text-base"
          on:click={() => ($enableSoundEffect = false)}
          disabled={$enableSoundEffect === false}
          variant="red"
        >
          OFF
        </PushButton>
        <PushButton
          twClass="text-base"
          on:click={() => ($enableSoundEffect = true)}
          disabled={$enableSoundEffect === true}
          variant="green"
        >
          ON
        </PushButton>
      </div>
    </div>
  </div>
</div>
