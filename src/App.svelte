<script lang="ts">
  import Router, { location } from "svelte-spa-router";
  import { tw } from "twind";
  import routes from "./routes";
  import { fly, fade } from "svelte/transition";
  import { css } from "twind/css";
  import { loadSounds } from "./sounds";
  import { onMount } from "svelte";
  import { preload } from "./preloader";
  import { data } from "./stores";
  import UpdatePrompt from "./libs/UpdatePrompt.svelte";

  const { assetsLoaded, loadingProgress, preloadAssets, getAssetResult } =
    preload;

  onMount(async () => {
    await preloadAssets();
    loadSounds();
    $data = await fetchData();
  });

  async function fetchData() {
    let res = await fetch(getAssetResult("data").blobUrl); // ~/data.json
    return res.json();
  }

  let style = tw(
    css({
      "@apply": "bg(center cover) h-full w-full overflow-hidden select-none",
    })
  );

  const loadingStyle = tw(
    css({
      "@apply":
        "fixed inset-0 w-full h-screen bg-white z-[9999] grid place-items-center",
      ".progress": {
        "@apply": "w-36 h-5 border border-red-900 bg-white",
        "&::after": {
          "@apply": "block h-full bg-red-900",
          width: "var(--progress-width)",
          transition: "1s width",
          content: "''",
        },
      },
    })
  );
</script>

{#if !$assetsLoaded}
  <div class={loadingStyle} out:fade={{ delay: 1000 }}>
    <div class="progress" style="--progress-width: {$loadingProgress}%" />
  </div>
{:else if $data.length}
  <div
    class={style}
    style="background-image: url({getAssetResult('home').url});"
  >
    {#key $location}
      <div
        class={tw`relative h-full w-full`}
        in:fly={{ y: -100, duration: 200, delay: 100 }}
      >
        <Router {routes} />
      </div>
    {/key}
  </div>
  <UpdatePrompt />
{/if}

<style>
  :global(html, body, #app) {
    width: 100%;
    height: 100%;
  }
</style>
