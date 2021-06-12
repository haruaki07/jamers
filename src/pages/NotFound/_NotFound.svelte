<script lang="ts">
  import { tw } from "twind/css";
  import ButtonBack from "~/libs/ButtonBack.svelte";
  import PageTitle from "~/libs/PageTitle.svelte";

  export let params: { wild: string };
</script>

<ButtonBack url="/" />

<div class={tw`page-wrapper p-4 z-[1]`}>
  <PageTitle twClass="uppercase">halaman tidak ditemukan</PageTitle>
</div>
