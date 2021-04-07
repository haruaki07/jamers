<script lang="ts">
  import { css } from "twind/css";
  import { theme, tw } from "twind";

  const style = tw(css`
    z-index: 1;
    @apply w-full h-screen text-center relative select-none py-24 sm:py-4 lg:py-24 flex flex-col;

    .title {
      text-shadow: 0 4px 1px ${theme("colors", ["red", "900"])};
      @apply text(white 5xl) sm:text-6xl font-black;
    }

    .btn-back {
      @apply mt-24 bg-white rounded-lg p-3 text-red-900 font-bold w-min mx-auto shadow-xl;
    }
  `);
</script>

<div class={style}>
  <h1 class="title">Pengaturan</h1>
  <a href="#/" class="btn-back">Kembali</a>
</div>
