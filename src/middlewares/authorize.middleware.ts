import { Request, Response, NextFunction } from "express";

import { UserRole } from "../enums/user-role.enum";
import { ForbiddenError } from "../utils/errors/ForbiddenError";

export const authorize =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ForbiddenError("Access denied"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ForbiddenError(
          "You do not have permission to access this resource",
        ),
      );
    }

    next();
  };
