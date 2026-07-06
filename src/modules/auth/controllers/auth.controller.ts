import { Request, Response, NextFunction } from "express";

import { AuthService } from "../services/auth.service";
import { RegisterUserDto } from "../dto/register-user.dto";

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await this.authService.register(req.body as RegisterUserDto);

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
