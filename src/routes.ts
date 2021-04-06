import type { RouteDefinition } from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import NotFound from "./pages/NotFound";

const routes: RouteDefinition = new Map();

routes.set("/", wrap({ asyncComponent: () => import("./pages/Console") }));
routes.set(
  "/monitors",
  wrap({ asyncComponent: () => import("./pages/Monitors") })
);
routes.set("*", NotFound);

export default routes;
