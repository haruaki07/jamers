<script lang="ts">
  import { tw, css, theme } from "twind/css";
  import Grid from "gridjs-svelte";
  import "~/../node_modules/gridjs/dist/theme/mermaid.min.css";
  import dataRaw from "./data.json?raw";
  import Button from "~/libs/Button";
  import { pop } from "svelte-spa-router";
  import ButtonBack from "~/libs/ButtonBack.svelte";

  export let params: { id?: string } = {};

  const data = JSON.parse(dataRaw).find((v) => v.id === params.id);

  const vocabs: any[] = data.values;

  const style = tw(
    css({
      "@apply":
        "w-full h-screen text-center relative select-none p-4 flex flex-col",
      ".title": {
        textShadow: `0 4px 1px ${tw(theme("colors", ["red", "900"]))}`,
        "@apply": "text(white 6xl) font-black mb-4 py-10 flex-shrink-0",
      },
      ".grid": {
        "@apply": "flex-grow overflow-y-auto",
      },
    })
  );

  const columns = ["Bahasa Indonesia", "Ngoko", "Krama", "Krama Inggil"];

  $: vocabs[0].length !== 4 && columns.pop();
</script>

<div class={style}>
  <ButtonBack url="/learn" />

  <h1 class="title">{data.name}</h1>
  <div class="grid">
    <Grid
      data={vocabs}
      {columns}
      pagination
      search
      fixedHeader
      language={{
        search: {
          placeholder: "Cari..",
        },
        noRecordsFound: "Tidak ditemukan",
      }}
      height="250px"
    />
  </div>
</div>
