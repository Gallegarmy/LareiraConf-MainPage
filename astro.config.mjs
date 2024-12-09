import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import compress from "astro-compress";

export default defineConfig({
  site: "https://www.lareiraconf.es",
  integrations: [tailwind(), sitemap(), compress()],
});
