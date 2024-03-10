<script lang="ts">
  import Router, { location } from "svelte-spa-router";
  import { tw } from "twind";
  import routes from "./routes";
  import { fly, fade } from "svelte/transition";
  import { css } from "twind/css";
  import { loadSounds } from "./sounds";
  import { onMount } from "svelte";
  import { preload } from "./preloader";
  import { data, started } from "./stores";
  import PushButton from "./libs/PushButton/_PushButton.svelte";

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
        "fixed inset-0 w-full h-screen bg-white z-[9999] flex flex-col items-center justify-center",
    })
  );

  const btnProgress = tw(
    css({
      "&:disabled": {
        filter: "unset",
      },
      ".content": {
        width: "150px",
        background: ({ theme }) =>
          `linear-gradient(to right, ${theme(
            "colors.blue.600"
          )} var(--progress), #163b8d var(--progress))`,
      },
    })
  );

  // window.addEventListener("beforepromptinstall", (e) => {
  //   e.preventDefault();
  //   //@ts-ignore
  //   e.prompt();
  // });
</script>

{#if !$assetsLoaded || !$started}
  <div class={loadingStyle} out:fade={{ delay: 1000 }}>
    <PushButton
      on:click={() => ($started = true)}
      variant="blue"
      class={btnProgress}
      disabled={!$assetsLoaded}
      style="--progress: {$loadingProgress}%"
    >
      {!$assetsLoaded ? `${Math.round($loadingProgress)}%` : "Start"}
    </PushButton>
  </div>
{:else if $started && $data.length}
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
{/if}

<svelte:head>
  {#if $assetsLoaded}
    <link rel="preload" as="image" href={getAssetResult("window").url} />
    <link rel="preload" as="image" href={getAssetResult("pita").url} />
  {/if}
</svelte:head>

<style>
  :global(html, body, #app) {
    width: 100%;
    height: 100%;
  }
</style>
