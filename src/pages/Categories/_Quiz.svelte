<script lang="ts">
  import { css, tw, theme } from "twind/css";
  import Button from "~/libs/Button";
  import { getModeById } from "~/stores";
  import ButtonBack from "~/libs/ButtonBack.svelte";
  import PageTitle from "~/libs/PageTitle.svelte";

  const style = tw(
    css({
      "@apply": "page-wrapper p-4 z-[1]",
      ".grid": {
        "@apply": "flex(& col) space-y-4 overflow-y-auto flex-grow",
        gridAutoRows: "min-content",
        ".box": {
          "@apply":
            "rounded-md bg-window-content grid place-items-center text(lg red-900) font(bold nunito) p-6",
        },
      },
    })
  );

  const quizMode = getModeById("quiz");
</script>

<ButtonBack url="/modes" />

<div class={style}>
  <PageTitle twClass="uppercase">Pilih level</PageTitle>
  <div class="grid">
    {#each quizMode.categories as category}
      <Button class="box" href="#/quiz/{category.id}">{category.name}</Button>
    {/each}
  </div>
</div>
