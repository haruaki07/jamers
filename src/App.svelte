<script lang="ts">
  import { onMount } from "svelte";
  import Router, { location } from "svelte-spa-router";
  import { fly } from "svelte/transition";
  import { tw } from "twind";
  import { css } from "twind/css";
  import bgHome from "~/assets/bg1.jpg";
  import PushButton from "./libs/PushButton/_PushButton.svelte";
  import { preload } from "./preloader";
  import routes from "./routes";
  import { loadSounds, playBgmIfEnabled } from "./sounds";
  import { data, started } from "./stores";

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
        "fixed inset-0 w-full h-screen z-[9999] flex flex-col items-center justify-center",
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

<div class={style} style="background-image: url({bgHome});">
  {#if !$assetsLoaded || !$started}
    <div class={loadingStyle}>
      <PushButton
        on:click={() => {
          playBgmIfEnabled();
          $started = true;
        }}
        variant="blue"
        class={btnProgress}
        disabled={!$assetsLoaded}
        style="--progress: {$loadingProgress}%"
      >
        {!$assetsLoaded ? `${Math.round($loadingProgress)}%` : "Start"}
      </PushButton>
    </div>
  {:else}
    {#key $location}
      <div
        class={tw`relative h-full w-full`}
        in:fly={{ y: -100, duration: 200, delay: 100 }}
      >
        <Router {routes} />
      </div>
    {/key}
  {/if}
</div>

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
