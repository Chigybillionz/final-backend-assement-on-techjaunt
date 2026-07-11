import { AppDataSource } from "../../../database/datasource";
import { Vehicle } from "../../../entities/Vehicle.entity";
import { QueryVehicleDto } from "../dto/query-vehicle.dto";
export class VehicleRepository {
  private readonly repository = AppDataSource.getRepository(Vehicle);

  /**
   * Create Vehicle
   */
  async create(data: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = this.repository.create(data);
    return this.repository.save(vehicle);
  }
  async findWithFilters(query: QueryVehicleDto) {
    const {
      page = 1,
      limit = 10,
      brand,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
    } = query;

    const queryBuilder = this.repository
      .createQueryBuilder("vehicle")
      .leftJoinAndSelect("vehicle.owner", "owner");

    if (brand) {
      queryBuilder.andWhere("LOWER(vehicle.brand) LIKE LOWER(:brand)", {
        brand: `%${brand}%`,
      });
    }

    if (fuelType) {
      queryBuilder.andWhere("vehicle.fuelType = :fuelType", {
        fuelType,
      });
    }

    if (transmission) {
      queryBuilder.andWhere("vehicle.transmission = :transmission", {
        transmission,
      });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere("vehicle.pricePerDay >= :minPrice", {
        minPrice,
      });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere("vehicle.pricePerDay <= :maxPrice", {
        maxPrice,
      });
    }

    queryBuilder
      .orderBy("vehicle.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get All Vehicles
   */
  async findAll(): Promise<Vehicle[]> {
    return this.repository.find({
      relations: {
        owner: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  /**
   * Get Vehicle By ID
   */
  async findById(id: string): Promise<Vehicle | null> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
      },
    });
  }

  /**
   * Update Vehicle
   */
  async update(id: string, data: Partial<Vehicle>): Promise<Vehicle | null> {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  /**
   * Delete Vehicle
   */
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
