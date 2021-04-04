import { withForms } from "@twind/forms";
import { setup } from "twind";
import App from "./App.svelte";

setup({
  preflight: withForms(),
});

const app = new App({
  target: document.getElementById("app"),
});

export default app;
