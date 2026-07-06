import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDto =
  (dto: any) => async (req: Request, res: Response, next: NextFunction) => {
    const output = plainToInstance(dto, req.body);

    const errors = await validate(output, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        })),
      });
    }

    req.body = output;

    next();
  };
