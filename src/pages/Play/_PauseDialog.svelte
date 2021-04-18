<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { tw } from "twind";

  const dispatch = createEventDispatcher();
</script>

<div
  class={tw`flex space-x-4 p-4 children:(w-1/3 font-medium text-white rounded-md p-2)`}
>
  <button class={tw`bg-red-600`} on:click={() => dispatch("exit")}>
    Keluar
  </button>
  <button class={tw`bg-blue-600`} on:click={() => dispatch("restart")}>
    Ulangi
  </button>
  <button class={tw`bg-green-600`} on:click={() => dispatch("resume")}>
    Lanjut
  </button>
</div>
