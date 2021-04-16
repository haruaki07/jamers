import { writable } from "svelte/store";

export const score = writable(0);

export const hscore = writable(parseInt(localStorage.getItem("hscore") || "0"));
hscore.subscribe((v) => localStorage.setItem("hscore", JSON.stringify(v)));
