import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

import { validateDto } from "../../../middlewares/validate.middleware";
import { authenticate } from "../../../middlewares/auth.middleware";

import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";

const router = Router();

const authController = new AuthController();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Register a customer or vehicle owner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *               role:
 *                 type: string
 *                 example: customer
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/register",
  validateDto(RegisterUserDto),
  authController.register.bind(authController),
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Login with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post(
  "/login",
  validateDto(LoginUserDto),
  authController.login.bind(authController),
);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current user
 *     description: Returns the authenticated user's profile.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authenticate, authController.me.bind(authController));

export default router;
