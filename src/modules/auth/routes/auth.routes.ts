import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

import { validateDto } from "../../../middlewares/validate.middleware";

import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";

const router = Router();

const authController = new AuthController();
console.log("✅ Auth routes loaded");

router.post(
  "/register",
  (req, res, next) => {
    console.log("✅ Register endpoint hit");
    next();
  },
  validateDto(RegisterUserDto),
  authController.register.bind(authController),
);

router.post(
  "/login",
  validateDto(LoginUserDto),
  authController.login.bind(authController),
);

export default router;
