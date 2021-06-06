import { images, fonts, json, audios } from "./assets";
import Preload from "preload-it";
import { writable, get } from "svelte/store";

function preloader() {
  const assetsArr = [...images, ...fonts, ...json, ...audios];
  const assets = writable<{ name: string; src: string; result?: any }[]>([
    ...assetsArr,
  ]);
  const assetsLoaded = writable(false);
  const loadingProgress = writable(0);

  const preload = new Preload();

  const preloadAssets = () =>
    preload.fetch(assetsArr.map((asset) => asset.src));

  preload.onprogress = (event: any) => {
    if (get(loadingProgress) < 100) {
      loadingProgress.set(event.progress);
    }
  };

  preload.oncomplete = (items: any[]) => {
    assets.update((v) => {
      const result: typeof v = [];
      items.forEach((item) => {
        const idx = v.findIndex((v) => v.src === item.url);
        result.push({ ...v[idx], result: item });
      });
      if (items.length === result.length && get(loadingProgress) < 100) {
        loadingProgress.set(100);
      }
      return result;
    });
    assetsLoaded.set(true);
  };

  function getAssetResult(name: string) {
    return getAsset(name).result;
  }

  function getAsset(name: string) {
    return get(assets).find((asset) => asset.name === name);
  }

  return {
    assets,
    getAsset,
    getAssetResult,
    assetsLoaded,
    loadingProgress,
    preloadAssets,
  };
}

export const preload = preloader();
