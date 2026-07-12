import { ReviewRepository } from "../repositories/review.repository";
import { BookingRepository } from "../../bookings/repositories/booking.repository";
import { VehicleRepository } from "../../vehicles/repositories/vehicle.repository";

import { CreateReviewDto } from "../dto/create-review.dto";

import { Review } from "../../../entities/Review.entity";
import { User } from "../../../entities/User.entity";

import { NotFoundError } from "../../../utils/errors/NotFoundError";
import { ConflictError } from "../../../utils/errors/ConflictError";
import { ForbiddenError } from "../../../utils/errors/ForbiddenError";

export class ReviewService {
  private readonly reviewRepository = new ReviewRepository();

  private readonly bookingRepository = new BookingRepository();

  private readonly vehicleRepository = new VehicleRepository();

  /**
   * Create Review
   */
  async create(customer: User, data: CreateReviewDto): Promise<Review> {
    // Check vehicle exists
    const vehicle = await this.vehicleRepository.findById(data.vehicleId);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    // Prevent owner from reviewing own vehicle
    if (vehicle.owner.id === customer.id) {
      throw new ForbiddenError("You cannot review your own vehicle");
    }

    // Check completed booking
    const booking = await this.bookingRepository.findCompletedBooking(
      customer.id,
      vehicle.id,
    );

    if (!booking) {
      throw new ForbiddenError(
        "You can only review vehicles you have successfully rented",
      );
    }

    // Prevent duplicate review
    const existingReview = await this.reviewRepository.findExistingReview(
      customer.id,
      vehicle.id,
    );

    if (existingReview) {
      throw new ConflictError("You have already reviewed this vehicle");
    }

    return this.reviewRepository.create({
      customer,
      vehicle,
      rating: data.rating,
      comment: data.comment,
    });
  }

  /**
   * Get Reviews for a Vehicle
   */
  async findByVehicle(vehicleId: string): Promise<Review[]> {
    return this.reviewRepository.findByVehicle(vehicleId);
  }

  /**
   * Get My Reviews
   */
  async findMyReviews(customer: User): Promise<Review[]> {
    return this.reviewRepository.findByCustomer(customer.id);
  }

  /**
   * Delete Review
   */
  async delete(id: string, customer: User): Promise<void> {
    const review = await this.reviewRepository.findById(id);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    if (review.customer.id !== customer.id) {
      throw new ForbiddenError("You are not allowed to delete this review");
    }

    await this.reviewRepository.delete(id);
  }
}
