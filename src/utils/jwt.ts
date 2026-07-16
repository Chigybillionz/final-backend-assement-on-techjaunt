import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { env } from "../config/env";

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

const accessTokenOptions: SignOptions = {
  expiresIn: env.jwt.expiresIn as SignOptions["expiresIn"],
};

const refreshTokenOptions: SignOptions = {
  expiresIn: env.jwt.refreshExpiresIn as SignOptions["expiresIn"],
};

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwt.secret as Secret, accessTokenOptions);
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(
    payload,
    env.jwt.refreshSecret as Secret,
    refreshTokenOptions,
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwt.secret as Secret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwt.refreshSecret as Secret) as JwtPayload;
};
