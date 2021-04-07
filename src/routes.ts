import type { RouteDefinition } from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import NotFound from "./pages/NotFound";
import Play from "./pages/Play";
import Settings from "./pages/Settings";

const routes: RouteDefinition = new Map();

routes.set("/", wrap({ asyncComponent: () => import("./pages/Home") }));
routes.set("/settings", Settings);
routes.set("/play", Play);
routes.set("*", NotFound);

export default routes;
