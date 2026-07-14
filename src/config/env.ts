import dotenv from "dotenv";

dotenv.config();

/**
 * Get required environment variable
 */
function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  // ==========================================
  // APPLICATION
  // ==========================================
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 8000,

  appName: process.env.APP_NAME || "AutoLease",

  appUrl: process.env.APP_URL || "http://localhost:8000",

  // ==========================================
  // JWT
  // ==========================================
  jwt: {
    secret: getEnv("JWT_SECRET"),

    expiresIn: process.env.JWT_EXPIRES_IN || "15m",

    refreshSecret: getEnv("JWT_REFRESH_SECRET"),

    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  // ==========================================
  // DATABASE
  // ==========================================
  database: {
    host: getEnv("DATABASE_HOST"),

    port: Number(process.env.DATABASE_PORT) || 5432,

    username: getEnv("DATABASE_USERNAME"),

    password: getEnv("DATABASE_PASSWORD"),

    database: getEnv("DATABASE_NAME"),
  },

  // ==========================================
  // GOOGLE OAUTH
  // ==========================================
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",

    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

    callbackUrl: process.env.GOOGLE_CALLBACK_URL || "",
  },

  // ==========================================
  // CLOUDINARY
  // ==========================================
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",

    apiKey: process.env.CLOUDINARY_API_KEY || "",

    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },

  // ==========================================
  // PAYSTACK
  // ==========================================
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY || "",

    baseUrl: process.env.PAYSTACK_BASE_URL || "https://api.paystack.co",
  },

  // ==========================================
  // REDIS
  // ==========================================
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",

    port: Number(process.env.REDIS_PORT) || 6379,
  },

  // ==========================================
  // SMTP
  // ==========================================
  smtp: {
    host: process.env.SMTP_HOST || "",

    port: Number(process.env.SMTP_PORT) || 587,

    user: process.env.SMTP_USER || "",

    pass: process.env.SMTP_PASS || "",
  },
};
