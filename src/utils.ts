export function shuffle<T>(arr: T[]) {
  return arr.sort(() => 0.5 - Math.random());
}

export function randomIndex(arr: any[]) {
  return Math.floor(Math.random() * arr.length);
}
