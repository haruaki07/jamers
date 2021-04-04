import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import { preprocess } from "./svelte.config.cjs";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ preprocess })],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
