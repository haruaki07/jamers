<script lang="ts">
  import Navbar from "./libs/Navbar";
  import Router from "svelte-spa-router";
  import { tw } from "twind";
  import routes from "./routes";
</script>

<div class={tw`bg-white w-full flex flex-col min-h-screen`}>
  <Navbar />
  <div class={tw`flex-grow`}>
    <Router {routes} />
  </div>
</div>
