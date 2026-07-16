import crypto from "crypto";

/**
 * Generate a secure random token
 */
export const generateRandomToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Hash a token before storing it
 */
export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
