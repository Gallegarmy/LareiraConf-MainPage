import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import compress from "astro-compress";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://www.lareiraconf.es",
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind(), sitemap(), react(), compress()],
});
