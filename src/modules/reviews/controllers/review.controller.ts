import { Request, Response, NextFunction } from "express";

import { ReviewService } from "../services/review.service";

import { CreateReviewDto } from "../dto/create-review.dto";
import { ReviewResponse } from "../responses/review.response";

import { Review } from "../../../entities/Review.entity";

export class ReviewController {
  private readonly reviewService = new ReviewService();

  /**
   * Create Review
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const review = await this.reviewService.create(
        req.user!,
        req.body as CreateReviewDto,
      );

      res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: new ReviewResponse(review),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Vehicle Reviews
   */
  async findByVehicle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const reviews = await this.reviewService.findByVehicle(
        req.params.vehicleId,
      );

      res.status(200).json({
        success: true,
        data: reviews.map((review: Review) => new ReviewResponse(review)),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get My Reviews
   */
  async findMyReviews(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const reviews = await this.reviewService.findMyReviews(req.user!);

      res.status(200).json({
        success: true,
        data: reviews.map((review: Review) => new ReviewResponse(review)),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Review
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.reviewService.delete(req.params.id, req.user!);

      res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
