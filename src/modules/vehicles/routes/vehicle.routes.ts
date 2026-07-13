import { Router } from "express";

import { VehicleController } from "../controllers/vehicle.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { validateDto } from "../../../middlewares/validate.middleware";
import { upload } from "../../../middlewares/upload.middleware";

import { UserRole } from "../../../enums/user-role.enum";

import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";

const router = Router();

const vehicleController = new VehicleController();

/**
 * @openapi
 * /vehicles:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Get all vehicles
 *     description: Returns all available vehicles.
 *     responses:
 *       200:
 *         description: Vehicles retrieved successfully
 */
router.get("/", vehicleController.findAll.bind(vehicleController));

/**
 * @openapi
 * /vehicles/{id}:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Get vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle retrieved successfully
 *       404:
 *         description: Vehicle not found
 */
router.get("/:id", vehicleController.findById.bind(vehicleController));

/**
 * @openapi
 * /vehicles:
 *   post:
 *     tags:
 *       - Vehicles
 *     summary: Create a vehicle
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
  description: Vehicle created successfully
  content:
    application/json:
      example:
        success: true
        message: Vehicle created successfully
        data:
          id: "123"
          brand: "Toyota"
          model: "Corolla"
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authenticate,
  authorize(UserRole.OWNER),
  validateDto(CreateVehicleDto),
  vehicleController.create.bind(vehicleController),
);

/**
 * @openapi
 * /vehicles/{id}/image:
 *   patch:
 *     tags:
 *       - Vehicles
 *     summary: Upload vehicle image
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.patch(
  "/:id/image",
  authenticate,
  authorize(UserRole.OWNER),
  upload.single("image"),
  vehicleController.uploadImage.bind(vehicleController),
);

/**
 * @openapi
 * /vehicles/{id}:
 *   delete:
 *     tags:
 *       - Vehicles
 *     summary: Delete vehicle
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.OWNER),
  vehicleController.delete.bind(vehicleController),
);

export default router;
