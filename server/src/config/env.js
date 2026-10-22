import fs from "node:fs";
import path from "node:path";

/**
 * Minimal .env loader. Real environment variables always win, so the same
 * code works with a file locally and with injected variables on a server.
 */
function loadDotEnv(file = path.resolve(".env")) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const entry = line.trim();
    if (!entry || entry.startsWith("#") || !entry.includes("=")) continue;
    const at = entry.indexOf("=");
    const key = entry.slice(0, at).trim();
    const value = entry.slice(at + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] == null) process.env[key] = value;
  }
}

loadDotEnv();

const nodeEnv = process.env.NODE_ENV || "development";
const isProduction = nodeEnv === "production";

const razorpay = {
  keyId: process.env.RAZORPAY_KEY_ID || "",
  keySecret: process.env.RAZORPAY_KEY_SECRET || "",
  webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "",
};

export const DEFAULT_ADMIN_PASSWORD = "Nalvalam@2026";

export const env = Object.freeze({
  nodeEnv,
  isProduction,
  isTest: nodeEnv === "test",
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || "",
  trustProxy: process.env.TRUST_PROXY === "true",
  corsOrigins: (process.env.CORS_ORIGINS || "").split(",").map((value) => value.trim().replace(/\/$/, "")).filter(Boolean),
  cookieSameSite: process.env.COOKIE_SAMESITE || "lax",
  cookieDomain: process.env.COOKIE_DOMAIN || undefined,
  cookieSecure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === "true" : isProduction,
  logLevel: process.env.LOG_LEVEL || (nodeEnv === "test" ? "silent" : "info"),
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@nalvalam.local",
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
  },
  razorpay: { ...razorpay, enabled: Boolean(razorpay.keyId && razorpay.keySecret) },
});

/** Fails fast on settings that must never be left to defaults in production. */
export function assertRuntimeConfig() {
  if (!env.isProduction) return [];
  const problems = [];
  if (!env.mongoUri) problems.push("MONGO_URI is required in production.");
  if (env.admin.password === DEFAULT_ADMIN_PASSWORD) problems.push("ADMIN_PASSWORD still has the default value.");
  if (problems.length) throw new Error(problems.join(" "));
  return problems;
}
