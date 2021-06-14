<script lang="ts">
  import { tw, css, theme } from "twind/css";
  import data from "./data.json?raw";
  import Button from "~/libs/Button";
  import ButtonBack from "~/libs/ButtonBack.svelte";
  import PageTitle from "~/libs/PageTitle.svelte";

  const vocabs: any[] = JSON.parse(data);

  const style = tw(
    css({
      zIndex: 1,
      "@apply": "page-wrapper p-4",
      ".grid": {
        "@apply": "flex(& col) space-y-4",
        ".box": {
          "@apply":
            "rounded-md bg-window-content grid place-items-center text(lg red-900) font(bold nunito) p-6 transition-transform transform duration-150",
          "&:hover": {
            "@apply": "scale-105",
          },
        },
      },
    })
  );
</script>

<ButtonBack url="/" />

<div class={style}>
  <PageTitle twClass="uppercase">Materi</PageTitle>
  <div class="grid">
    {#each vocabs as vocab}
      <Button class="box" href="#/learn/{vocab.id}">{vocab.name}</Button>
    {/each}
  </div>
</div>
