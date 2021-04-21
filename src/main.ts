import { setup } from "twind";
import App from "./App.svelte";
import "./style.css";
// import { load } from "webfontloader";
// import BBREot from "~/assets/BradyBunchRemastered.eot";
// import BBRWof from "~/assets/BradyBunchRemastered.woff";
// import BBRWof2 from "~/assets/BradyBunchRemastered.woff2";

// load({
//   classes: false,
//   custom: {
//     families: ["Brady Bunch Remastered"],
//     urls: [BBREot, BBRWof, BBRWof2],
//   },
// });

setup({
  preflight: {
    button: {
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
