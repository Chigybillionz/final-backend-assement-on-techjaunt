import { Router } from "express";

import { CustomerController } from "../controllers/customer.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";

import { UserRole } from "../../../enums/user-role.enum";

const router = Router();

const customerController = new CustomerController();

router.use(authenticate);
router.use(authorize(UserRole.CUSTOMER));

/**
 * @openapi
 * /customers/dashboard:
 *   get:
 *     tags:
 *       - Customer Dashboard
 *     summary: Get customer dashboard
 *     description: Returns dashboard statistics for the authenticated customer.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/dashboard",
  customerController.getDashboard.bind(customerController),
);

/**
 * @openapi
 * /customers/bookings:
 *   get:
 *     tags:
 *       - Customer Dashboard
 *     summary: Get my bookings
 *     description: Returns all bookings belonging to the authenticated customer.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/bookings",
  customerController.getBookings.bind(customerController),
);

/**
 * @openapi
 * /customers/payments:
 *   get:
 *     tags:
 *       - Customer Dashboard
 *     summary: Get my payments
 *     description: Returns all payments made by the authenticated customer.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Payments retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/payments",
  customerController.getPayments.bind(customerController),
);

/**
 * @openapi
 * /customers/profile:
 *   get:
 *     tags:
 *       - Customer Dashboard
 *     summary: Get my profile
 *     description: Returns the authenticated customer's profile.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", customerController.getProfile.bind(customerController));

export default router;
