import { Router } from "express";

import { OwnerController } from "../controllers/owner.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";

import { UserRole } from "../../../enums/user-role.enum";

const router = Router();

const ownerController = new OwnerController();

router.use(authenticate);
router.use(authorize(UserRole.OWNER));

/**
 * @openapi
 * /owners/dashboard:
 *   get:
 *     tags:
 *       - Owner Dashboard
 *     summary: Get owner dashboard
 *     description: Returns dashboard statistics for the authenticated vehicle owner.
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
router.get("/dashboard", ownerController.getDashboard.bind(ownerController));

/**
 * @openapi
 * /owners/vehicles:
 *   get:
 *     tags:
 *       - Owner Dashboard
 *     summary: Get my vehicles
 *     description: Returns all vehicles owned by the authenticated owner.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Vehicles retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/vehicles", ownerController.getVehicles.bind(ownerController));

/**
 * @openapi
 * /owners/bookings:
 *   get:
 *     tags:
 *       - Owner Dashboard
 *     summary: Get bookings for my vehicles
 *     description: Returns all bookings associated with the owner's vehicles.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/bookings", ownerController.getBookings.bind(ownerController));

/**
 * @openapi
 * /owners/revenue:
 *   get:
 *     tags:
 *       - Owner Dashboard
 *     summary: Get owner revenue
 *     description: Returns revenue generated from the owner's completed bookings.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Revenue retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/revenue", ownerController.getRevenue.bind(ownerController));

export default router;
