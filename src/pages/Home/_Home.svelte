<script lang="ts">
  import { push } from "svelte-spa-router";
  import Button from "~/libs/Button";
</script>

<div class={"wrapper"}>
  <div class="actions">
    <Button>Sound</Button>
  </div>
  <h1 class="title">Kuiz</h1>
  <div class="menu">
    <button class="btn btn-red" on:click={() => push("/play")}> Mulai </button>
    <button class="btn btn-red" on:click={() => push("/play2")}>
      Mulai2
    </button>
    <button class="btn btn-blue" on:click={() => push("/settings")}>
      Pengaturan
    </button>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    @apply w-full h-screen text-center relative select-none py-24 sm:py-4 lg:py-24 flex flex-col;
  }

  .actions {
    @apply absolute top-3 left-3 flex items-center space-x-3;
  }

  .title {
    text-shadow: 0 4px 1px blueviolet;
    @apply text-white text-6xl font-black;
  }

  .menu {
    @apply mt-24 w-full space-y-10 flex flex-col flex-grow items-center justify-center;
  }

  .btn {
    transition: 150ms all;
    will-change: box-shadow, transform;
    @apply text-3xl text-white font-bold px-10 py-3 rounded-lg;
    &:hover {
      @apply bg-opacity-30;
    }

    &:active {
      @apply bg-opacity-40 translate-y-1;
      box-shadow: unset;
    }

    &-red {
      box-shadow: 0 4px 1px red;
      @apply bg-red-600 bg-opacity-20;
    }

    &-blue {
      box-shadow: 0 4px 1px blue;
      @apply bg-blue-600 bg-opacity-10;
    }
  }
</style>
