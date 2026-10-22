import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

const FIFTEEN_MINUTES = 15 * 60 * 1000;

function limiter({ limit, windowMs = FIFTEEN_MINUTES }) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => env.isTest,
    message: { error: "Too many requests. Please try again in a few minutes." },
  });
}

/** Sign-in attempts. */
export const loginLimiter = limiter({ limit: 20 });

/** Anonymous endpoints that write data: enquiries, donations, payment calls. */
export const publicWriteLimiter = limiter({ limit: 30 });
