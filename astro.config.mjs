import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import svgr from "vite-plugin-svgr";

import compress from "astro-compress";

export default defineConfig({
  site: "https://www.lareiraconf.es",
  integrations: [tailwind(), sitemap(), react(), compress()],
  vite: {
    plugins: [svgr()],
  },
});
