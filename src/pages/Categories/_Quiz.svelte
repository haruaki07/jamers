<script lang="ts">
  import { css, tw, theme } from "twind/css";
  import Button from "~/libs/Button";
  import { getModeById } from "~/stores";
  import ButtonBack from "~/libs/ButtonBack.svelte";

  const style = tw(
    css({
      "@apply":
        "w-full h-screen text-center relative select-none p-4 flex flex-col",
      ".title": {
        textShadow: `0 4px 1px ${tw(theme("colors", ["red", "900"]))}`,
        "@apply": "text(white 6xl) font-black mb-4 py-10 flex-shrink-0",
      },
      ".grid": {
        "@apply": "flex(& col) space-y-4 overflow-y-auto flex-grow",
        gridAutoRows: "min-content",
        ".box": {
          "@apply":
            "rounded-md bg-window-content grid place-items-center text(lg red-900) font-bold p-6",
        },
      },
    })
  );

  const quizMode = getModeById("quiz");
</script>

<div class={style}>
  <ButtonBack url="/modes" />
  <h1 class="title">Pilih Level</h1>
  <div class="grid">
    {#each quizMode.categories as category}
      <Button class="box" href="#/quiz/{category.id}">{category.name}</Button>
    {/each}
  </div>
</div>
