<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { push } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { tw } from "twind";
  import { score } from "./scores";

  const dispatch = createEventDispatcher();

  const handleRestart = () => {
    dispatch("restart");
  };
</script>

<div
  in:fade={{ duration: 150 }}
  class={tw`fixed inset-0 flex items-center justify-center w-full h-full bg(black opacity-25)`}
>
  <div
    class={tw`rounded-md max-w-sm w-full bg-white p-4`}
    in:fly={{ y: -30, duration: 150 }}
  >
    <center>
      <div class={tw`mb-4 text(xl red-900) font-bold`}>Game over!</div>
      <p class={tw`text(lg red-800) font-medium`}>
        Score kamu: {$score}
      </p>
    </center>
    <div class={tw`flex mt-6 children:w-1/2 space-x-4`}>
      <button
        class={tw`p-2 bg-red-600 rounded-md text-white font-medium`}
        on:click={() => push("/")}
      >
        Keluar
      </button>
      <button
        class={tw`p-2 bg-blue-600 rounded-md text-white font-medium`}
        on:click={handleRestart}
      >
        Ulangi
      </button>
    </div>
  </div>
</div>
