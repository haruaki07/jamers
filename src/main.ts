import { setup } from "twind";
import App from "./App.svelte";
import "./styles.css";

setup();

const app = new App({
  target: document.getElementById("app"),
});

export default app;
