import { Request, Response, NextFunction } from "express";

import { AuthService } from "../services/auth.service";
import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";

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

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.authService.login(req.body as LoginUserDto);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async me(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      data: {
        id: req.user!.id,
        firstName: req.user!.firstName,
        lastName: req.user!.lastName,
        email: req.user!.email,
        phone: req.user!.phone,
        role: req.user!.role,
        isEmailVerified: req.user!.isEmailVerified,
      },
    });
  }
}
