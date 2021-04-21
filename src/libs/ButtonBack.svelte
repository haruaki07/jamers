<script lang="ts">
  import { pop, push } from "svelte-spa-router";
  import { tw } from "twind";
  import Button from "./Button";

  export let url = "";
</script>

<Button
  on:click={() => (url ? push(url) : pop())}
  class={tw`p-1 md:(px-4 py-2) rounded-md shadow bg-yellow-500 text(white sm md:base) font-medium absolute top-4 left-4 z-10`}
>
  Kembali
</Button>
