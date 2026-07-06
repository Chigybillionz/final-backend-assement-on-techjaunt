import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { validateDto } from "../../../middlewares/validate.middleware";
import { RegisterUserDto } from "../dto/register-user.dto";

const router = Router();

const authController = new AuthController();

router.post(
  "/register",
  validateDto(RegisterUserDto),
  authController.register.bind(authController),
);

export default router;
