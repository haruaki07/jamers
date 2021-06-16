import bgWindow from "~/assets/window.png";
import bgHome from "~/assets/bg1.jpg";
import bgPita from "~/assets/pita.png";
import jamersLogo from "~/assets/jamers-logo.png";
import data from "./data.json?url";
import BBREot from "~/assets/BradyBunchRemastered.eot";
import BBRWof from "~/assets/BradyBunchRemastered.woff";
import BBRWof2 from "~/assets/BradyBunchRemastered.woff2";
import pipop from "~/assets/pipop.wav";
import btnClick from "~/assets/menuclick.ogg";
import bgm from "~/assets/bgm.mp3";
import Nunito from "~/assets/fonts/Nunito-Regular.woff";
import Nunito2 from "~/assets/fonts/Nunito-Regular.woff2";
import NunitoSemiBold from "~/assets/fonts/Nunito-SemiBold.woff";
import NunitoSemiBold2 from "~/assets/fonts/Nunito-SemiBold.woff2";
import NunitoBold from "~/assets/fonts/Nunito-Bold.woff";
import NunitoBold2 from "~/assets/fonts/Nunito-Bold.woff2";

export const images = [
  { name: "window", src: bgWindow },
  { name: "home", src: bgHome },
  { name: "pita", src: bgPita },
  { name: "jamers-logo", src: jamersLogo },
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
  { name: "Nunito", src: Nunito },
  { name: "Nunito2", src: Nunito2 },
  { name: "NunitoSemiBold", src: NunitoSemiBold },
  { name: "NunitoSemiBold2", src: NunitoSemiBold2 },
  { name: "NunitoBold", src: NunitoBold },
  { name: "NunitoBold2", src: NunitoBold2 },
];

export const json = [{ name: "data", src: data }];
