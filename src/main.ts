import { setup } from "twind";
import App from "./App.svelte";
import "./style.css";

setup({
  preflight: {
    a: {
      WebkitTapHighlightColor: "transparent",
      textDecoration: "none",
    },
    button: {
      WebkitTapHighlightColor: "transparent",
      outline: "none",
      "&:focus": {
        outline: "none !important",
      },
    },
  },
  plugins: {
    "bg-window-content": {
      boxShadow: "inset 0 2px 5px 2px #efb469",
      backgroundColor: "#f3db95",
    },
  },
});

const app = new App({
  target: document.getElementById("app"),
});

export default app;
