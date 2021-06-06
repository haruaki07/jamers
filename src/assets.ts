import bgWindow from "~/assets/window.png";
import bgHome from "~/assets/bg1.jpg";
import bgPita from "~/assets/pita.png";
import data from "./data.json?url";
import BBREot from "~/assets/BradyBunchRemastered.eot";
import BBRWof from "~/assets/BradyBunchRemastered.woff";
import BBRWof2 from "~/assets/BradyBunchRemastered.woff2";
import pipop from "~/assets/pipop.wav";
import btnClick from "~/assets/menuclick.ogg";
import bgm from "~/assets/bgm.mp3";

export const images = [
  { name: "window", src: bgWindow },
  { name: "home", src: bgHome },
  { name: "pita", src: bgPita },
];

export const audios = [
  { name: "correct", src: pipop },
  { name: "btnClick", src: btnClick },
  { name: "bgm", src: bgm },
];

export const fonts = [
  { name: "BBREot", src: BBREot },
  { name: "BBRWof", src: BBRWof },
  { name: "BBRWof2", src: BBRWof2 },
];

export const json = [{ name: "data", src: data }];
