import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import { preprocess } from "./svelte.config.cjs";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({ preprocess }),
    VitePWA({
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,json}",
          "**/*.{png,jpg}",
          "**/*.{mp3,ogg,wav}",
          "**/*.{woff,woff2,eot}",
        ],
      },
      injectRegister: "inline",
      registerType: "autoUpdate",
      manifest: {
        name: "Jamers",
        short_name: "",
        theme_color: "#83613c",
        display: "fullScreen",
        orientation: "any",
        scope: "/",
        lang: "id",
        start_url: "/",
        icons: [
          {
            src: "images/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "images/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "images/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "images/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "images/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "images/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "images/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
