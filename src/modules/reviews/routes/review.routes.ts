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
 * Public Routes
 */
router.get(
  "/vehicle/:vehicleId",
  reviewController.findByVehicle.bind(reviewController),
);

/**
 * Customer Routes
 */
router.post(
  "/",
  authenticate,
  authorize(UserRole.CUSTOMER),
  validateDto(CreateReviewDto),
  reviewController.create.bind(reviewController),
);

router.get(
  "/my-reviews",
  authenticate,
  authorize(UserRole.CUSTOMER),
  reviewController.findMyReviews.bind(reviewController),
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.CUSTOMER),
  reviewController.delete.bind(reviewController),
);

export default router;
