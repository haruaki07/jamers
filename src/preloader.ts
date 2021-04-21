import bgWindow from "~/assets/window.png";
import bgHome from "~/assets/bg1.jpg";
import bgPita from "~/assets/pita.png";
import data from "./data.json?url";
import BBREot from "~/assets/BradyBunchRemastered.eot";
import BBRWof from "~/assets/BradyBunchRemastered.woff";
import BBRWof2 from "~/assets/BradyBunchRemastered.woff2";
import Preload from "preload-it";
import { writable } from "svelte/store";

function preloader() {
  const assets = writable<Record<string, any>>({});
  const assetsLoaded = writable(false);
  const loadingProgress = writable(0);

  const preload = new Preload();

  const preloadAssets = () =>
    preload.fetch([bgWindow, bgHome, bgPita, data, BBREot, BBRWof, BBRWof2]);

  preload.onprogress = (event: any) => {
    loadingProgress.set(event.progress);
  };

  preload.oncomplete = (items: any[]) => {
    assetsLoaded.set(true);
    assets.update((v) => {
      const res: typeof v = {};
      items.forEach((el, i) => {
        res[i] = el;
      });
      return res;
    });
  };

  return {
    assets,
    assetsLoaded,
    loadingProgress,
    preloadAssets,
  };
}

export const preload = preloader();
