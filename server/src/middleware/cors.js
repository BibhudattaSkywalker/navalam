import { env } from "../config/env.js";

/**
 * Lets the separately hosted site and admin panel call the API with cookies.
 * Only origins listed in CORS_ORIGINS are echoed back; same-origin requests are unaffected.
 */
export function cors(req, res, next) {
  const origin = req.headers.origin;
  if (origin && env.corsOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "Content-Type");
      res.setHeader("Access-Control-Max-Age", "600");
      return res.sendStatus(204);
    }
  }
  next();
}
