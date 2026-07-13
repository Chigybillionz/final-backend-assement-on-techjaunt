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

  /**
   * Get Vehicles With Pagination, Search, Filtering & Sorting
   */
  async findWithFilters(query: QueryVehicleDto) {
    const {
      page = 1,
      limit = 10,
      brand,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      available,
      sort = "createdAt",
      order = "DESC",
    } = query;

    const queryBuilder = this.repository
      .createQueryBuilder("vehicle")
      .leftJoinAndSelect("vehicle.owner", "owner");

    // Search by brand
    if (brand) {
      queryBuilder.andWhere("LOWER(vehicle.brand) LIKE LOWER(:brand)", {
        brand: `%${brand}%`,
      });
    }

    // Filter by fuel type
    if (fuelType) {
      queryBuilder.andWhere("vehicle.fuelType = :fuelType", {
        fuelType,
      });
    }

    // Filter by transmission
    if (transmission) {
      queryBuilder.andWhere("vehicle.transmission = :transmission", {
        transmission,
      });
    }

    // Filter by availability
    if (available !== undefined) {
      queryBuilder.andWhere("vehicle.available = :available", {
        available,
      });
    }

    // Minimum price
    if (minPrice !== undefined) {
      queryBuilder.andWhere("vehicle.pricePerDay >= :minPrice", {
        minPrice,
      });
    }

    // Maximum price
    if (maxPrice !== undefined) {
      queryBuilder.andWhere("vehicle.pricePerDay <= :maxPrice", {
        maxPrice,
      });
    }

    // Allowed sortable fields
    const allowedSortFields = ["createdAt", "pricePerDay", "brand", "year"];

    const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";

    queryBuilder.orderBy(
      `vehicle.${sortField}`,
      order === "ASC" ? "ASC" : "DESC",
    );

    queryBuilder.skip((page - 1) * limit).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrevious: page > 1,
      },
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
