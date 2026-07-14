import app from "./app";

import { env } from "./config/env";
import logger from "./config/logger";
import { AppDataSource } from "./database/datasource";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function startServer() {
  try {
    await AppDataSource.initialize();

    logger.info("Database connected successfully.");

    const server = app.listen(env.port, () => {
      logger.info(`🚀 ${env.appName} API is running on port ${env.port}`);
    });

    process.on("SIGINT", async () => {
      logger.info("SIGINT received. Shutting down...");

      server.close(async () => {
        await AppDataSource.destroy();
        logger.info("Database connection closed.");
        process.exit(0);
      });
    });

    process.on("SIGTERM", async () => {
      logger.info("SIGTERM received. Shutting down...");

      server.close(async () => {
        await AppDataSource.destroy();
        logger.info("Database connection closed.");
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error(error);

    process.exit(1);
  }
}

startServer();
