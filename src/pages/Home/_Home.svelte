<script lang="ts">
  import { css } from "twind/css";
  import { theme, tw } from "twind";
  import { push } from "svelte-spa-router";

  const style = tw(
    css({
      "@apply":
        "w-full h-screen text-center relative py-24 sm:py-4 lg:py-24 flex flex-col",
      ".title": {
        textShadow: `0 4px 1px ${theme("colors", ["red", "900"])}`,
        "@apply": "text(white 6xl) font-black",
      },
      ".menu": {
        "@apply":
          "mt-24 w-full space-y-10 flex flex(col grow) items-center justify-center",
      },
      ".btn": {
        transition: "150ms all",
        willChange: "box-shadow, transform",
        "@apply":
          "text(3xl white) font-bold px-10 py-3 rounded-lg focus:(outline-none) outline-none border-0",
        "&:hover": {
          "@apply": "bg-opacity-30",
        },
        "&:active": {
          "@apply": "bg-opacity-40 translate-y-1",
          boxShadow: "unset",
        },
        "&-red": {
          boxShadow: `0 4px 1px ${theme("colors", ["red", "300"])}`,
          "@apply": "bg(red-600 opacity-20)",
        },
        "&-blue": {
          boxShadow: `0 4px 1px ${theme("colors", ["blue", "300"])}`,
          "@apply": "bg(blue-600 opacity-20)",
        },
      },
    })
  );
</script>

<div class={style}>
  <h1 class="title">Kuiz</h1>
  <div class="menu">
    <button class="btn btn-red" on:click={() => push("/play")}> Mulai </button>
    <button class="btn btn-blue" on:click={() => push("/settings")}>
      Pengaturan
    </button>
  </div>
</div>
