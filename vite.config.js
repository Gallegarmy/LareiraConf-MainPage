import { defineConfig } from "vite";

export default defineConfig({
  server: {
    allowedHosts: ["lareiraconf.es", "all"],
  },
  preview: {
    host: "0.0.0.0",
    port: 4321,
  },
});
