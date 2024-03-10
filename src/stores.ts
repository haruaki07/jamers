import { get, writable } from "svelte/store";

export interface Choice {
  value: string;
  correct: boolean;
}

export type Question = {
  id: number;
  text: string;
  choices: Choice[];
};

export interface ICategory {
  questions: Question[];
  id: string;
  name: string;
  vocabs: string[][];
}

export interface IData {
  id: string;
  name: string;
  categories: ICategory[];
}

export const started = writable(false);

export const data = writable<IData[]>([]);

export function getModeById(id: string) {
  return get(data).find((d) => d.id === id);
}

export function getCategory(modeId: string, categoryId: string) {
  return getModeById(modeId)?.categories.find((c) => c.id === categoryId);
}
