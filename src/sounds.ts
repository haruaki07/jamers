import type { HowlOptions, Howl as IHowl } from "howler";
import { Howl } from "howler";
import { get, writable } from "svelte/store";
import { preload } from "./preloader";

type AudioParam = {
  key: string;
  opts: HowlOptions;
};

const { getAssetResult } = preload;

export const sounds = writable<Record<string, IHowl>>({});

// bgm state
export const bgmPlaying = writable(
  (localStorage.getItem("bgm") || "true") === "true"
);

// sound effect state
export const enableSoundEffect = writable(
  (localStorage.getItem("soundEffect") || "true") === "true"
);
enableSoundEffect.subscribe((v) =>
  localStorage.setItem("soundEffect", v.toString())
);

export function muteBgm() {
  get(sounds)["bgm"].pause();
  bgmPlaying.set(false);
  localStorage.setItem("bgm", "false");
}

export function playBgm() {
  get(sounds)["bgm"].play();
  bgmPlaying.set(true);
  localStorage.setItem("bgm", "true");
}

export function playBgmIfEnabled() {
  const exist = localStorage.getItem("bgm");

  if (exist === null || exist === "true") {
    get(sounds)["bgm"].play();
    bgmPlaying.set(true);
  }
}

export function playAudio(name: string) {
  if (get(enableSoundEffect)) get(sounds)[name].play();
}

export function loadSounds() {
  const urlSounds: AudioParam[] = [
    {
      key: "correct",
      opts: {
        src: getAssetResult("correct").url,
        volume: 0.5,
      },
    },
    {
      key: "btnClick",
      opts: { src: getAssetResult("btnClick").url },
    },
    {
      key: "bgm",
      opts: {
        src: getAssetResult("bgm").url,
        html5: true,
        loop: true,
        autoplay: false,
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
