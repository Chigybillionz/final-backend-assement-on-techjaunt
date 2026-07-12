import { AppDataSource } from "../../../database/datasource";

import { Review } from "../../../entities/Review.entity";

export class ReviewRepository {
  private readonly repository = AppDataSource.getRepository(Review);

  /**
   * Create Review
   */
  async create(data: Partial<Review>): Promise<Review> {
    const review = this.repository.create(data);

    await this.repository.save(review);

    return this.findById(review.id) as Promise<Review>;
  }

  /**
   * Find Review By ID
   */
  async findById(id: string): Promise<Review | null> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        customer: true,
        vehicle: {
          owner: true,
        },
      },
    });
  }

  /**
   * Find Reviews By Vehicle
   */
  async findByVehicle(vehicleId: string): Promise<Review[]> {
    return this.repository.find({
      where: {
        vehicle: {
          id: vehicleId,
        },
      },
      relations: {
        customer: true,
        vehicle: {
          owner: true,
        },
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  /**
   * Find Reviews By Customer
   */
  async findByCustomer(customerId: string): Promise<Review[]> {
    return this.repository.find({
      where: {
        customer: {
          id: customerId,
        },
      },
      relations: {
        customer: true,
        vehicle: {
          owner: true,
        },
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  /**
   * Check Existing Review
   */
  async findExistingReview(
    customerId: string,
    vehicleId: string,
  ): Promise<Review | null> {
    return this.repository.findOne({
      where: {
        customer: {
          id: customerId,
        },
        vehicle: {
          id: vehicleId,
        },
      },
    });
  }

  /**
   * Update Review
   */
  async update(id: string, data: Partial<Review>): Promise<Review | null> {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  /**
   * Delete Review
   */
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
