import { Router } from "express";

import { AdminController } from "../controllers/admin.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";

import { UserRole } from "../../../enums/user-role.enum";

const router = Router();

const adminController = new AdminController();

/**
 * @openapi
 * /admin/dashboard:
 *   get:
 *     tags:
 *       - Admin Dashboard
 *     summary: Get admin dashboard
 *     description: Returns overall platform statistics including users, vehicles, bookings, payments, reviews, favorites, and revenue.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/dashboard",
  authenticate,
  authorize(UserRole.ADMIN),
  adminController.getDashboard.bind(adminController),
);

export default router;
