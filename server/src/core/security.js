import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, KEY_LENGTH).toString("hex")}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, KEY_LENGTH);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/** Session tokens are stored hashed, so a leaked database cannot be replayed. */
export const hashToken = (token) => createHash("sha256").update(token).digest("hex");
export const newToken = () => randomBytes(32).toString("hex");

export const signHmac = (secret, value) => createHmac("sha256", secret).update(value).digest("hex");

export function safeEqual(left, right) {
  const a = Buffer.from(String(left ?? ""));
  const b = Buffer.from(String(right ?? ""));
  return a.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

/** Human friendly, collision resistant reference shown on receipts. */
export function orderReference() {
  return `NVF${Date.now().toString(36).toUpperCase()}${randomBytes(2).toString("hex").toUpperCase()}`;
}
