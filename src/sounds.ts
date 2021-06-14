import { Howl } from "howler";
import type { Howl as IHowl, HowlOptions } from "howler";
import { preload } from "./preloader";
import { get, writable } from "svelte/store";

type AudioParam = {
  key: string;
  opts: HowlOptions;
};

const { getAssetResult, assetsLoaded, getAsset } = preload;

export const sounds = writable<Record<string, IHowl>>({});
export const bgmPlaying = writable(
  (localStorage.getItem("bgm") || "false") === "true"
); // initial value is false
bgmPlaying.subscribe((v) => localStorage.setItem("bgm", v.toString()));
export const enableSoundEffect = writable(
  (localStorage.getItem("soundEffect") || "true") === "true"
); // initial value is true
enableSoundEffect.subscribe((v) =>
  localStorage.setItem("soundEffect", v.toString())
);

export function muteBgm() {
  get(sounds)["bgm"].pause();
  bgmPlaying.set(false);
}

export function playBgm() {
  get(sounds)["bgm"].play();
  bgmPlaying.set(true);
}

export function playAudio(name: string) {
  if (get(enableSoundEffect)) get(sounds)[name].play();
}

export function loadSounds() {
  if (!assetsLoaded) return;
  const urlSounds: AudioParam[] = [
    {
      key: "correct",
      opts: { src: getAssetResult("correct").url, volume: 0.5 },
    },
    { key: "btnClick", opts: { src: getAssetResult("btnClick").url } },
    {
      key: "bgm",
      opts: {
        src: getAssetResult("bgm").url,
        html5: true,
        loop: true,
        autoplay: get(bgmPlaying),
      },
    },
  ];
  sounds.update((v) => {
    const res: typeof v = {};
    for (const url of urlSounds) {
      res[url.key] = new Howl(url.opts);
    }
    return res;
  });
}
