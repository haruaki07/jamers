import { setup } from "twind";
import App from "./App.svelte";
import "./style.css";

setup({
  preflight: {
    button: {
      outline: "none",
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
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
    "page-wrapper": {
      width: "100%",
      height: "100%",
      textAlign: "center",
      position: "relative",
      display: "grid",
      gridTemplateRows: "1fr auto 1fr",
    },
  },
});

const app = new App({
  target: document.getElementById("app"),
});

export default app;
