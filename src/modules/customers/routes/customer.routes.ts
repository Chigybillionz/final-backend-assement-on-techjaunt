import { Router } from "express";

import { CustomerController } from "../controllers/customer.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";

import { UserRole } from "../../../enums/user-role.enum";

const router = Router();

const customerController = new CustomerController();

router.use(authenticate);
router.use(authorize(UserRole.CUSTOMER));

router.get(
  "/dashboard",
  customerController.getDashboard.bind(customerController),
);

router.get(
  "/bookings",
  customerController.getBookings.bind(customerController),
);

router.get(
  "/payments",
  customerController.getPayments.bind(customerController),
);

router.get("/profile", customerController.getProfile.bind(customerController));

export default router;
