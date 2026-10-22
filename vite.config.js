import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { app as api, ready } from "./server/app.js";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "nalvalam-api",
      async configureServer(server) {
        await ready;
        server.middlewares.use(api);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
    },
  },
});
