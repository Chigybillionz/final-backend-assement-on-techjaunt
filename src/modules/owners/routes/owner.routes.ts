import { Router } from "express";

import { OwnerController } from "../controllers/owner.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";

import { UserRole } from "../../../enums/user-role.enum";

const router = Router();

const ownerController = new OwnerController();

router.use(authenticate);
router.use(authorize(UserRole.OWNER));

router.get("/dashboard", ownerController.getDashboard.bind(ownerController));

router.get("/vehicles", ownerController.getVehicles.bind(ownerController));

router.get("/bookings", ownerController.getBookings.bind(ownerController));

router.get("/revenue", ownerController.getRevenue.bind(ownerController));

export default router;
