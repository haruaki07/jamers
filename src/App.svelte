<script lang="ts">
  import Navbar from "./libs/Navbar";
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import { tw } from "twind";
  import NotFound from "./pages/NotFound";

  const routes = {
    "/": wrap({
      asyncComponent: () => import("./pages/Console"),
    }),
    "/watch": wrap({
      asyncComponent: () => import("./pages/Monitors"),
    }),
    "*": NotFound,
  };
</script>

<div class={tw`bg-white w-full flex flex-col min-h-screen`}>
  <Navbar />
  <div class={tw`flex-grow`}>
    <Router {routes} />
  </div>
</div>
