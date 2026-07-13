import { Router } from "express";

import { FavoriteController } from "../controllers/favorite.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { validateDto } from "../../../middlewares/validate.middleware";

import { UserRole } from "../../../enums/user-role.enum";

import { CreateFavoriteDto } from "../dto/create-favorite.dto";

const router = Router();

const favoriteController = new FavoriteController();

/**
 * @openapi
 * /favorites:
 *   post:
 *     tags:
 *       - Favorites
 *     summary: Add vehicle to favorites
 *     description: Allows a customer to add a vehicle to their favorites list.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleId
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 example: 816568c2-e2d8-4d43-a4c3-462f955ef0fc
 *     responses:
 *       201:
 *         description: Vehicle added to favorites successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Vehicle already exists in favorites
 */
router.post(
  "/",
  authenticate,
  authorize(UserRole.CUSTOMER),
  validateDto(CreateFavoriteDto),
  favoriteController.create.bind(favoriteController),
);

/**
 * @openapi
 * /favorites/my-favorites:
 *   get:
 *     tags:
 *       - Favorites
 *     summary: Get my favorite vehicles
 *     description: Returns all favorite vehicles for the authenticated customer.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Favorites retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/my-favorites",
  authenticate,
  authorize(UserRole.CUSTOMER),
  favoriteController.findMyFavorites.bind(favoriteController),
);

/**
 * @openapi
 * /favorites/{id}:
 *   delete:
 *     tags:
 *       - Favorites
 *     summary: Remove a vehicle from favorites
 *     description: Removes a favorite vehicle belonging to the authenticated customer.
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
 *         description: Favorite removed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Favorite not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.CUSTOMER),
  favoriteController.delete.bind(favoriteController),
);

export default router;
