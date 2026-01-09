import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import svgr from "vite-plugin-svgr";
import compress from "astro-compress";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind(), sitemap(), react(), compress()],
  vite: {
    plugins: [svgr()],
    resolve: {
      alias: {
        "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/img/assets", import.meta.url)),
        "@img": fileURLToPath(new URL("./src/img", import.meta.url)),
        "@public": fileURLToPath(new URL("./public", import.meta.url)),
      },
    },
  },
});
