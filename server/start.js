import path from "node:path";
import express from "express";
import { assertRuntimeConfig, env } from "./src/config/env.js";
import { printBanner } from "./src/core/banner.js";
import { logger } from "./src/core/logger.js";

assertRuntimeConfig();

const { app: api, ready } = await import("./src/app.js");
const { disconnectDatabase } = await import("./src/config/database.js");
await ready;

const dist = path.resolve("dist");
const uploads = path.resolve("public/uploads");

const server = express();
server.use(api);
// Images uploaded after the build only exist in public/uploads, so serve that folder directly.
server.use("/uploads", express.static(uploads, { maxAge: "7d" }));
server.use(express.static(dist));
server.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(dist, "index.html"));
});

const http = server.listen(env.port, () => {
  printBanner({ url: `http://localhost:${env.port}`, mode: env.nodeEnv });
});

let closing = false;
async function shutdown(signal) {
  if (closing) return;
  closing = true;
  logger.info(`${signal} received, shutting down`);
  http.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
