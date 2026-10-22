import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../core/logger.js";

const DB_NAME = "nalvalam";
let memoryServer = null;

mongoose.set("strictQuery", true);

/**
 * Connects to MONGO_URI. Without one (local development only) an embedded
 * MongoDB is started under data/mongo so the project still runs out of the box.
 */
export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (env.mongoUri) {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 });
  } else {
    if (env.isProduction) throw new Error("MONGO_URI is not set.");
    logger.warn("MONGO_URI is empty, starting the embedded MongoDB (development only).");
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const dbPath = path.resolve("data/mongo");
    fs.mkdirSync(dbPath, { recursive: true });
    memoryServer = await MongoMemoryServer.create({
      instance: { dbName: DB_NAME, dbPath, storageEngine: "wiredTiger" },
    });
    await mongoose.connect(memoryServer.getUri(), { dbName: DB_NAME });
  }

  const { host, name } = mongoose.connection;
  logger.info(`MongoDB connected (${host}/${name})`);
  return mongoose.connection;
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop({ doCleanup: false, force: false });
    memoryServer = null;
  }
}

export function isDatabaseUp() {
  return mongoose.connection.readyState === 1;
}
