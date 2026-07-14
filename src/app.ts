import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import hpp from "hpp";
import rateLimit from "express-rate-limit";

import logger from "./config/logger";
import { AppDataSource } from "./database/datasource";

import authRoutes from "./modules/auth/routes/auth.routes";
import vehicleRoutes from "./modules/vehicles/routes/vehicle.routes";
import bookingRoutes from "./modules/bookings/routes/booking.routes";
import paymentRoutes from "./modules/payments/routes/payment.routes";
import ownerRoutes from "./modules/owners/routes/owner.routes";
import customerRoutes from "./modules/customers/routes/customer.routes";
import reviewRoutes from "./modules/reviews/routes/review.routes";
import favoriteRoutes from "./modules/favorites/routes/favorite.routes";
import adminRoutes from "./modules/admin/routes/admin.routes";

import { errorHandler } from "./middlewares/error.middleware";

const app = express();

/**
 * Trust Proxy
 * Required when deploying behind Nginx, Render, Railway, Cloudflare, etc.
 */
app.set("trust proxy", 1);

/**
 * Rate Limiter
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

/**
 * Security Middlewares
 */
app.use(helmet());

app.use(hpp());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(compression());

/**
 * Request Body Parsers
 */
app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

app.use(cookieParser());

/**
 * HTTP Logger
 */
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

/**
 * Root Endpoint
 */
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to AutoLease API",
    version: "1.0.0",
  });
});

/**
 * Health Check Endpoint
 */
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),

    services: {
      database: AppDataSource.isInitialized ? "connected" : "disconnected",
    },

    memory: {
      rss: process.memoryUsage().rss,
      heapUsed: process.memoryUsage().heapUsed,
      heapTotal: process.memoryUsage().heapTotal,
    },

    node: process.version,
  });
});

/**
 * API Routes
 */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/owners", ownerRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/admin", adminRoutes);

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;
