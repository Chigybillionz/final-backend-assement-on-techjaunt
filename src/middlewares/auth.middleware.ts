import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { AppDataSource } from "../database/datasource";
import { User } from "../entities/User.entity";
import { UnauthorizedError } from "../utils/errors/UnauthorizedError";

interface JwtPayload {
  sub: string;
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authentication required");
    }

    const token = authorization.split(" ")[1];

    const payload = jwt.verify(token, env.jwt.secret) as JwtPayload;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
