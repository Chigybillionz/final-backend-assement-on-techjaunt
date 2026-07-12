import { Review } from "../../../entities/Review.entity";

import { UserResponse } from "../../auth/responses/user.response";
import { VehicleResponse } from "../../vehicles/responses/vehicle.response";

export class ReviewResponse {
  id: string;

  rating: number;

  comment: string;

  customer: UserResponse;

  vehicle: VehicleResponse;

  createdAt: Date;

  updatedAt: Date;

  constructor(review: Review) {
    this.id = review.id;
    this.rating = review.rating;
    this.comment = review.comment;

    this.customer = new UserResponse(review.customer);
    this.vehicle = new VehicleResponse(review.vehicle);

    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
  }
}
