import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

import { validateDto } from "../../../middlewares/validate.middleware";
import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { UserRole } from "../../../enums/user-role.enum";

import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";

const router = Router();

const authController = new AuthController();

router.post(
  "/register",
  validateDto(RegisterUserDto),
  authController.register.bind(authController),
);

router.post(
  "/login",
  validateDto(LoginUserDto),
  authController.login.bind(authController),
);

router.get("/me", authenticate, authController.me.bind(authController));

export default router;
