<script lang="ts">
  import { css, tw, theme } from "twind/css";
  import Button from "~/libs/Button";
  import { getModeById } from "~/stores";
  import { pop } from "svelte-spa-router";
  import ButtonBack from "~/libs/ButtonBack.svelte";
  import PageTitle from "~/libs/PageTitle.svelte";

  const style = tw(
    css({
      "@apply": "page-wrapper p-4 z-[1]",
      ".grid": {
        "@apply": "grid(& cols-1 md:cols-2) gap-4 overflow-y-auto flex-grow",
        gridAutoRows: "min-content",
        ".box": {
          "@apply":
            "rounded-md bg-window-content grid place-items-center text(lg red-900) font-bold p-6",
        },
      },
    })
  );

  const vocabsMode = getModeById("vocabs");
</script>

<ButtonBack url="/modes" />

<div class={style}>
  <PageTitle twClass="uppercase">Pilih Kategori</PageTitle>
  <div class="grid">
    {#each vocabsMode.categories as category}
      <Button class="box" href="#/play/{category.id}">{category.name}</Button>
    {/each}
  </div>
</div>
