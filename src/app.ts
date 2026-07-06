import express from "express";

import helmet from "helmet";

import cors from "cors";

import compression from "compression";

import cookieParser from "cookie-parser";

import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";

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
app.use(errorHandler);

export default app;
