import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { LIMITS } from "./config/constants.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { asyncHandler } from "./core/asyncHandler.js";
import { apiNotFound, errorHandler } from "./middleware/errorHandler.js";
import { cors } from "./middleware/cors.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { webhook } from "./modules/donations/payment.controller.js";
import { buildApiRouter } from "./routes/index.js";
import { seedDatabase } from "./seed/seed.js";

export function createApp() {
  const app = express();
  if (env.trustProxy) app.set("trust proxy", 1);

  app.use("/api", cors);
  app.use("/api", requestLogger);
  app.use("/api", helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

  // Razorpay signs the exact bytes it sends, so this route has to see the body before JSON parsing.
  app.post("/api/payments/webhook", express.raw({ type: "application/json" }), asyncHandler(webhook));

  app.use(cookieParser());
  app.use(express.json({ limit: LIMITS.BODY }));
  app.use("/api", buildApiRouter());
  app.use("/api", apiNotFound);
  app.use(errorHandler);
  return app;
}

/** Connects, makes sure indexes exist and the starter data is in place. */
export async function bootstrap() {
  await connectDatabase();
  await Promise.all(Object.values(mongoose.models).map((model) => model.init()));
  await seedDatabase();
}

export const app = createApp();
export const ready = bootstrap();
