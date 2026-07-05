import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 5000,

  appName: process.env.APP_NAME || "AutoLease",

  appUrl: process.env.APP_URL || "http://localhost:5000",

  jwtSecret: process.env.JWT_SECRET || "",

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "",

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",

  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  database: {
    host: process.env.DATABASE_HOST || "localhost",

    port: Number(process.env.DATABASE_PORT) || 5432,

    username: process.env.DATABASE_USERNAME || "postgres",

    password: process.env.DATABASE_PASSWORD || "postgres",

    database: process.env.DATABASE_NAME || "autolease",
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",

    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

    callbackUrl: process.env.GOOGLE_CALLBACK_URL || "",
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",

    apiKey: process.env.CLOUDINARY_API_KEY || "",

    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },

  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY || "",
  },

  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",

    port: Number(process.env.REDIS_PORT) || 6379,
  },

  smtp: {
    host: process.env.SMTP_HOST || "",

    port: Number(process.env.SMTP_PORT) || 587,

    user: process.env.SMTP_USER || "",

    pass: process.env.SMTP_PASS || "",
  },
};
