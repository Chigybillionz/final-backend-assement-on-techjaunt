import app from "./app";

import { env } from "./config/env";

import logger from "./config/logger";

import { AppDataSource } from "./database/datasource";
console.log("JWT Secret:", env.jwt.secret);

async function startServer() {
  try {
    await AppDataSource.initialize();

    logger.info("Database connected successfully.");

    app.listen(env.port, () => {
      logger.info(`🚀 ${env.appName} API is running on port ${env.port}`);
    });
  } catch (error) {
    logger.error(error);

    process.exit(1);
  }
}

startServer();
