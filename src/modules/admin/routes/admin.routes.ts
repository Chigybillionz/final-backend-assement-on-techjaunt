import { Router } from "express";

import { AdminController } from "../controllers/admin.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";

import { UserRole } from "../../../enums/user-role.enum";

const router = Router();

const adminController = new AdminController();

router.get(
  "/dashboard",
  authenticate,
  authorize(UserRole.ADMIN),
  adminController.getDashboard.bind(adminController),
);

export default router;
