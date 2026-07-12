import { AppDataSource } from "../../../database/datasource";

import { Favorite } from "../../../entities/Favorite.entity";

export class FavoriteRepository {
  private readonly repository = AppDataSource.getRepository(Favorite);

  /**
   * Create Favorite
   */
  async create(data: Partial<Favorite>): Promise<Favorite> {
    const favorite = this.repository.create(data);

    await this.repository.save(favorite);

    return this.findById(favorite.id) as Promise<Favorite>;
  }

  /**
   * Find Favorite By ID
   */
  async findById(id: string): Promise<Favorite | null> {
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
   * Find Customer Favorites
   */
  async findByCustomer(customerId: string): Promise<Favorite[]> {
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
   * Find Existing Favorite
   */
  async findExistingFavorite(
    customerId: string,
    vehicleId: string,
  ): Promise<Favorite | null> {
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
   * Delete Favorite
   */
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
