/** Usage: npm run seed. Creates the first admin and the starter posts and causes if they are missing. */
import { connectDatabase, disconnectDatabase } from "../src/config/database.js";
import { logger } from "../src/core/logger.js";
import { seedDatabase } from "../src/seed/seed.js";

try {
  await connectDatabase();
  await seedDatabase();
  logger.info("Seed finished");
} catch (error) {
  logger.error("Seed failed", error);
  process.exitCode = 1;
} finally {
  await disconnectDatabase();
}
