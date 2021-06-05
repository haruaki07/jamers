<script lang="ts">
  import { css } from "twind/css";
  import { theme, tw } from "twind";
  import Button from "~/libs/Button";

  const style = tw(
    css({
      "@apply":
        "w-full h-screen text-center relative py-24 sm:py-4 lg:py-24 flex flex-col",
      ".title": {
        "@apply": "text(white 6xl) font-black",
        textShadow: `0 4px 1px ${tw(theme("colors", ["red", "900"]))}`,
      },
      ".menu": {
        "@apply":
          "mt-24 w-full space-y-10 flex flex(col grow) items-center justify-center",
      },
      ".btn": {
        transition: "150ms all",
        willChange: "transform",
        "@apply":
          "text(3xl white) font-bold px-10 py-3 rounded-lg focus:(outline-none) outline-none border-0 transform transition-transform duration-200",
        "&:hover": {
          "@apply": "scale-105",
        },
        "&-red": {
          "@apply": "bg-red-600",
        },
        "&-green": {
          "@apply": "bg-green-600",
        },
        "&-blue": {
          "@apply": "bg-blue-600",
        },
      },
    })
  );
</script>

<div class={style}>
  <h1 class="title">Jamers</h1>
  <div class="menu">
    <Button class="btn btn-red" href="#/modes">Mulai</Button>
    <Button class="btn btn-green" href="#/learn">Materi</Button>
    <Button class="btn btn-blue" href="#/settings">Pengaturan</Button>
  </div>
</div>
