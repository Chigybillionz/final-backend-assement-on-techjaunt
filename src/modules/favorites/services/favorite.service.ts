import { FavoriteRepository } from "../repositories/favorite.repository";
import { VehicleRepository } from "../../vehicles/repositories/vehicle.repository";

import { CreateFavoriteDto } from "../dto/create-favorite.dto";

import { Favorite } from "../../../entities/Favorite.entity";
import { User } from "../../../entities/User.entity";

import { NotFoundError } from "../../../utils/errors/NotFoundError";
import { ConflictError } from "../../../utils/errors/ConflictError";
import { ForbiddenError } from "../../../utils/errors/ForbiddenError";

export class FavoriteService {
  private readonly favoriteRepository = new FavoriteRepository();

  private readonly vehicleRepository = new VehicleRepository();

  /**
   * Add Favorite
   */
  async create(customer: User, data: CreateFavoriteDto): Promise<Favorite> {
    const vehicle = await this.vehicleRepository.findById(data.vehicleId);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    // Prevent owners from favoriting their own vehicles
    if (vehicle.owner.id === customer.id) {
      throw new ForbiddenError("You cannot favorite your own vehicle");
    }

    const existingFavorite = await this.favoriteRepository.findExistingFavorite(
      customer.id,
      vehicle.id,
    );

    if (existingFavorite) {
      throw new ConflictError("Vehicle already added to favorites");
    }

    return this.favoriteRepository.create({
      customer,
      vehicle,
    });
  }

  /**
   * Get My Favorites
   */
  async findMyFavorites(customer: User): Promise<Favorite[]> {
    return this.favoriteRepository.findByCustomer(customer.id);
  }

  /**
   * Remove Favorite
   */
  async delete(id: string, customer: User): Promise<void> {
    const favorite = await this.favoriteRepository.findById(id);

    if (!favorite) {
      throw new NotFoundError("Favorite not found");
    }

    if (favorite.customer.id !== customer.id) {
      throw new ForbiddenError("You are not allowed to remove this favorite");
    }

    await this.favoriteRepository.delete(id);
  }
}
