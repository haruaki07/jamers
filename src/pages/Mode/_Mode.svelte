<script lang="ts">
  import { pop } from "svelte-spa-router";
  import { css, tw, theme } from "twind/css";
  import Button from "~/libs/Button";
  import ButtonBack from "~/libs/ButtonBack.svelte";
  import { data } from "~/stores";

  const style = tw(
    css({
      "@apply":
        "w-full h-screen text-center relative select-none p-4 flex flex-col",
      ".title": {
        textShadow: `0 4px 1px ${tw(theme("colors", ["red", "900"]))}`,
        "@apply": "text(white 6xl) font-black mb-4 py-10 flex-shrink-0",
      },
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
</script>

<div class={style}>
  <ButtonBack url="/" />

  <h1 class="title">Pilih Mode</h1>
  <div class="grid">
    {#each $data as mode}
      <Button class="box" href="#/modes/{mode.id}">{mode.name}</Button>
    {/each}
  </div>
</div>
