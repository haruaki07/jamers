<script lang="ts">
  import { pop, push, replace } from "svelte-spa-router";
  import { tw } from "twind";
  import Button from "./Button";
  import { ArrowLeft } from "./Icons";

  export let url = "";
</script>

<Button
  on:click={() => (url ? replace(url) : pop())}
  class={tw`text(white 2xl lg:4xl) bg-transparent absolute top-4 left-4 z-10`}
>
  <ArrowLeft />
</Button>
