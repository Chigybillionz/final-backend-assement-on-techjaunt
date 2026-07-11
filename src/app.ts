import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./modules/auth/routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import vehicleRoutes from "./modules/vehicles/routes/vehicle.routes";
import bookingRoutes from "./modules/bookings/routes/booking.routes";
import paymentRoutes from "./modules/payments/routes/payment.routes";

const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to AutoLease API",
    version: "1.0.0",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", paymentRoutes);

// Global Error Handler (always last)
app.use(errorHandler);

export default app;
