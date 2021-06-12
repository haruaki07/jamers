<script lang="ts">
  import { tw, css } from "twind/css";
  import Grid from "gridjs-svelte";
  import "~/../node_modules/gridjs/dist/theme/mermaid.min.css";
  import dataRaw from "./data.json?raw";
  import ButtonBack from "~/libs/ButtonBack.svelte";
  import PageTitle from "~/libs/PageTitle.svelte";

  export let params: { id?: string } = {};

  const data = JSON.parse(dataRaw).find((v) => v.id === params.id);

  const vocabs: any[] = data.values;

  const style = tw(
    css({
      zIndex: 1,
      "@apply": "page-wrapper p-4",
      ".grid": {
        "@apply": "flex-grow overflow-y-auto",
      },
    })
  );

  const columns = ["Bahasa Indonesia", "Ngoko", "Krama", "Krama Inggil"];

  $: vocabs[0].length !== 4 && columns.pop();
</script>

<ButtonBack url="/learn" />

<div class={style}>
  <PageTitle class="uppercase">{data.name}</PageTitle>
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
