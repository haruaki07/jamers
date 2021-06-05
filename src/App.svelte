<script lang="ts">
  import Router, { location } from "svelte-spa-router";
  import routes from "./routes";
  import { fly, fade } from "svelte/transition";
  import { css, tw } from "twind/css";
  import { loadSounds } from "./sounds";
  import { onMount } from "svelte";
  import { preload } from "./preloader";
  import bgHome from "~/assets/bg1.jpg";
  import { data } from "./stores";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  const { assetsLoaded, loadingProgress, preloadAssets, assets } = preload;

  onMount(async () => {
    await preloadAssets();
    loadSounds();
    $data = await fetchData();
  });

  async function fetchData() {
    let res = await fetch($assets[3].blobUrl); // ~/data.json
    return res.json();
  }

  $: style = tw(
    css({
      backgroundImage: `url(${bgHome})`,
      "@apply":
        "bg(center cover) bg-white min-h-screen w-full overflow-hidden select-none",
    })
  );

  const loadingStyle = tw(
    css({
      "@apply":
        "fixed inset-0 w-full h-screen bg-white z-[9999] grid place-items-center",
      ".progress": {
        "@apply": "w-36 h-5 border(& red-900) bg-white",
        "&::after": {
          "@apply": "block h-full bg-red-900",
          width: "var(--progress-width)",
          content: "''",
        },
      },
    })
  );

  $: progress = tweened($loadingProgress, {
    duration: 150,
    easing: cubicOut,
  });
</script>

{#if !$assetsLoaded}
  <div class={loadingStyle} out:fade={{ delay: 250 }}>
    <div class="progress" style="--progress-width: {$progress}%" />
  </div>
{:else if $data.length}
  <div class={style}>
    {#key $location}
      <div class={tw`relative`} in:fly={{ y: -100, duration: 200, delay: 100 }}>
        <Router {routes} />
      </div>
    {/key}
  </div>
{/if}
