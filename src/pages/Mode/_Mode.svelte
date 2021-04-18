<script lang="ts">
  import { css, tw, theme } from "twind/css";
  import modes from "~/modes";

  const style = tw(
    css({
      "@apply":
        "w-full h-screen text-center relative select-none p-4 flex flex-col",
      ".title": {
        textShadow: `0 4px 1px ${theme("colors", ["red", "900"])}`,
        "@apply": "text(white 6xl) font-black mb-4 py-10 flex-shrink-0",
      },

      ".grid": {
        "@apply": "grid grid(cols-2) gap-4 overflow-y-auto",

        ".box": {
          "@apply":
            "rounded-md bg-white flex items-center text-center justify-center text(lg red-900) font-bold p-6",
        },
      },
    })
  );
</script>

<div class={style}>
  <h1 class="title">Pilih Mode</h1>
  <div class="grid">
    {#each modes as mode}
      <a class="box" href="#/mode/{mode.key}">{mode.text}</a>
    {/each}
  </div>
</div>
