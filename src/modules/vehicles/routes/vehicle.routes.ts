import { Router } from "express";

import { VehicleController } from "../controllers/vehicle.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { validateDto } from "../../../middlewares/validate.middleware";

import { UserRole } from "../../../enums/user-role.enum";

import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";

const router = Router();

const vehicleController = new VehicleController();

router.get("/", vehicleController.findAll.bind(vehicleController));

router.get("/:id", vehicleController.findById.bind(vehicleController));

router.post(
  "/",
  authenticate,
  authorize(UserRole.OWNER),
  validateDto(CreateVehicleDto),
  vehicleController.create.bind(vehicleController),
);

router.patch(
  "/:id",
  authenticate,
  authorize(UserRole.OWNER),
  validateDto(UpdateVehicleDto),
  vehicleController.update.bind(vehicleController),
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.OWNER),
  vehicleController.delete.bind(vehicleController),
);

export default router;
