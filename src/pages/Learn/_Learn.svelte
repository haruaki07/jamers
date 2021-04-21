<script lang="ts">
  import { tw, css, theme } from "twind/css";
  import data from "./data.json?raw";
  import Button from "~/libs/Button";
  import ButtonBack from "~/libs/ButtonBack.svelte";

  const vocabs: any[] = JSON.parse(data);

  const style = tw(
    css({
      "@apply":
        "w-full h-screen text-center relative select-none p-4 flex flex-col",
      ".title": {
        textShadow: `0 4px 1px ${tw(theme("colors", ["red", "900"]))}`,
        "@apply": "text(white 6xl) font-black mb-4 py-10 flex-shrink-0",
      },
      ".grid": {
        "@apply": "flex(& col) space-y-4",
        ".box": {
          "@apply":
            "rounded-md bg-window-content grid place-items-center text(lg red-900) font-bold p-6 transition-transform transform duration-150",
          "&:hover": {
            "@apply": "scale-105",
          },
        },
      },
    })
  );
</script>

<div class={style}>
  <ButtonBack url="/" />

  <h1 class="title">Materi</h1>
  <div class="grid">
    {#each vocabs as vocab}
      <Button class="box" href="#/learn/{vocab.id}">{vocab.name}</Button>
    {/each}
  </div>
</div>
