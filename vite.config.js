import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "nalvalam-api",
      async configureServer(server) {
        // Loaded only for `vite dev`, so `vite build` never opens a database connection.
        const { app: api, ready } = await import("./server/app.js");
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
