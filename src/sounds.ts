import { Howl } from "howler";
import type { Howl as IHowl } from "howler";
import pipop from "~/assets/pipop.wav";
import menuhover from "~/assets/menuclick.ogg";
import bgm from "~/assets/bgm.mp3";
import { get, writable } from "svelte/store";

export const sounds = writable<Record<string, IHowl>>({});
export const bgmPlaying = writable(true);

export function muteBgm() {
  get(sounds)["bgm"].stop();
  bgmPlaying.set(false);
}

export function playBgm() {
  get(sounds)["bgm"].play();
  bgmPlaying.set(true);
}

export function loadSounds() {
  const urlSounds = [
    { key: "pipop", opts: { src: pipop, volume: 0.5 } },
    { key: "menuhover", opts: { src: menuhover } },
    {
      key: "bgm",
      opts: { src: bgm, html5: true, loop: true, autoplay: get(bgmPlaying) },
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
