import type { RouteDefinition } from "svelte-spa-router";
import { Quiz, Vocabs } from "./pages/Categories";
import Mode from "./pages/Mode";
import NotFound from "./pages/NotFound";
import { Play, PlayQuiz } from "./pages/Play";
import { Learn, SubLearn } from "./pages/Learn";
import Settings from "./pages/Settings";
import Home from "./pages/Home";

const routes: RouteDefinition = new Map();

routes.set("/", Home);
routes.set("/settings", Settings);
routes.set("/play/:id", Play);
routes.set("/modes", Mode);
routes.set("/modes/vocabs", Vocabs);
routes.set("/modes/quiz", Quiz);
routes.set("/quiz/:id", PlayQuiz);
routes.set("/learn", Learn);
routes.set("/learn/:id", SubLearn);
routes.set("*", NotFound);

export default routes;
