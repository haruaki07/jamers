<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { tw } from "twind";
  import { trapFocus, closeModal } from "~/libs/Modal";
  import { push } from "svelte-spa-router";

  export let resumeAction: () => void;

  const dispatch = createEventDispatcher();

  const handleRestart = () => {
    dispatch("restart");
  };

  const handleExit = () => {
    closeModal();
    push("/");
  };
</script>

<div class={tw`flex space-x-4 p-4 children:w-1/3`} use:trapFocus>
  <button
    class={tw`p-2 bg-red-600 rounded-md text-white font-medium`}
    on:click={handleExit}
  >
    Keluar
  </button>
  <button
    class={tw`p-2 bg-blue-600 rounded-md text-white font-medium`}
    on:click={handleRestart}
  >
    Ulangi
  </button>
  <button
    class={tw`p-2 bg-green-600 rounded-md text-white font-medium`}
    on:click={resumeAction}
  >
    Lanjut
  </button>
</div>
