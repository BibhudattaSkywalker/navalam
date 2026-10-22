import { env } from "../config/env.js";
import { logger } from "../core/logger.js";

/** One access-log line per API request, with the time it took. */
export function requestLogger(req, res, next) {
  if (env.isTest) return next();
  const started = process.hrtime.bigint();
  res.on("finish", () => {
    const ms = Number(process.hrtime.bigint() - started) / 1e6;
    const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
    logger[level](`${req.method} ${req.originalUrl} ${res.statusCode} ${ms.toFixed(0)}ms`);
  });
  next();
}
