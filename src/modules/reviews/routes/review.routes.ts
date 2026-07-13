import { Router } from "express";

import { ReviewController } from "../controllers/review.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { validateDto } from "../../../middlewares/validate.middleware";

import { UserRole } from "../../../enums/user-role.enum";

import { CreateReviewDto } from "../dto/create-review.dto";

const router = Router();

const reviewController = new ReviewController();

/**
 * @openapi
 * /reviews/vehicle/{vehicleId}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get reviews for a vehicle
 *     description: Returns all reviews for a specific vehicle.
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *       404:
 *         description: Vehicle not found
 */
router.get(
  "/vehicle/:vehicleId",
  reviewController.findByVehicle.bind(reviewController),
);

/**
 * @openapi
 * /reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Create a review
 *     description: Allows a customer to review a vehicle they have successfully rented.
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
 *               - rating
 *               - comment
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 example: 816568c2-e2d8-4d43-a4c3-462f955ef0fc
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Amazing ride. Highly recommended.
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Customer is not allowed to review this vehicle
 */
router.post(
  "/",
  authenticate,
  authorize(UserRole.CUSTOMER),
  validateDto(CreateReviewDto),
  reviewController.create.bind(reviewController),
);

/**
 * @openapi
 * /reviews/my-reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get my reviews
 *     description: Returns all reviews created by the authenticated customer.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/my-reviews",
  authenticate,
  authorize(UserRole.CUSTOMER),
  reviewController.findMyReviews.bind(reviewController),
);

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete a review
 *     description: Deletes a review owned by the authenticated customer.
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
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.CUSTOMER),
  reviewController.delete.bind(reviewController),
);

export default router;
