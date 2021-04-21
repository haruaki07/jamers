import { writable } from "svelte/store";

export const score = writable(0);

interface IHighScore {
  krama: number;
  kramainggil: number;
  ngoko: number;
  lv1: number;
  lv2: number;
  lv3: number;
}

export const hscore = writable<IHighScore>(
  JSON.parse(localStorage.getItem("highscore")) || {
    krama: 0,
    kramainggil: 0,
    ngoko: 0,
    lv1: 0,
    lv2: 0,
    lv3: 0,
  }
);
hscore.subscribe((v) => localStorage.setItem("highscore", JSON.stringify(v)));
