export function shuffle<T>(arr: T[]) {
  const result = [...arr];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export function randomIndex(arr: any[]) {
  return Math.floor(Math.random() * arr.length);
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
