<script lang="ts">
  import { css, tw } from "twind/css";
  import Button from "~/libs/Button";
  import ButtonBack from "~/libs/ButtonBack.svelte";
  import PageTitle from "~/libs/PageTitle.svelte";
  import { data } from "~/stores";

  const style = tw(
    css({
      "@apply": "page-wrapper p-4 z-[1]",
      ".grid": {
        "@apply": "grid(& cols-1 md:cols-2) gap-4 overflow-y-auto flex-grow",
        gridAutoRows: "min-content",
        ".box": {
          "@apply":
            "rounded-md bg-window-content grid place-items-center text(lg red-900) font(bold nunito) p-6",
        },
      },
    })
  );
</script>

<ButtonBack url="/" />

<div class={style}>
  <PageTitle twClass="uppercase">pilih mode</PageTitle>
  <div class="grid">
    {#each $data as mode}
      <Button class="box" href="#/modes/{mode.id}">{mode.name}</Button>
    {/each}
  </div>
</div>
