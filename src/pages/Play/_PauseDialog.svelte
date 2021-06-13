<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { tw } from "twind/css";
  import { Music, Sound } from "~/libs/Icons";
  import PushButton from "~/libs/PushButton";
  import { bgmPlaying, muteBgm, playBgm, enableSoundEffect } from "~/sounds";

  const dispatch = createEventDispatcher();
</script>

<div class={tw`flex(& col) space-y-3 m-4 p-3 bg-window-content rounded-md`}>
  <div class={tw`flex justify-between items-center my-2 space-x-4`}>
    {#if $bgmPlaying}
      <PushButton title="Matikan Musik" block icon on:click={muteBgm}>
        <Music slash />
      </PushButton>
    {:else}
      <PushButton title="Nyalakan Musik" block icon on:click={playBgm}>
        <Music />
      </PushButton>
    {/if}
    {#if $enableSoundEffect}
      <PushButton
        title="Matikan Efek Suara"
        block
        icon
        on:click={() => ($enableSoundEffect = false)}
      >
        <Sound off />
      </PushButton>
    {:else}
      <PushButton
        title="Nyalakan Efek Suara"
        block
        icon
        on:click={() => ($enableSoundEffect = true)}
      >
        <Sound />
      </PushButton>
    {/if}
  </div>
  <PushButton
    variant="blue"
    twClass="text-base py-2"
    on:click={() => dispatch("resume")}
  >
    Lanjut
  </PushButton>
  <PushButton
    variant="green"
    twClass="text-base py-2"
    on:click={() => dispatch("restart")}
  >
    Ulangi
  </PushButton>
  <PushButton
    variant="red"
    twClass="text-base py-2"
    on:click={() => dispatch("exit")}
  >
    Keluar
  </PushButton>
</div>
