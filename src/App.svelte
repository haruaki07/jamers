<script lang="ts">
  import Router, { location } from "svelte-spa-router";
  import { tw } from "twind";
  import routes from "./routes";
  import { fly } from "svelte/transition";
  import { css } from "twind/css";
  import Sunset from "~/assets/sunset.jpg";

  const style = tw(
    css({
      backgroundImage: `url(${Sunset})`,
      "@apply":
        "bg(center cover) bg-white w-full min-h-screen overflow-hidden select-none",
    })
  );
</script>

<div class={style}>
  <!-- <Navbar /> -->
  {#key $location}
    <div class={tw`relative`} in:fly={{ y: -100, duration: 200, delay: 100 }}>
      <Router {routes} />
    </div>
  {/key}
</div>
