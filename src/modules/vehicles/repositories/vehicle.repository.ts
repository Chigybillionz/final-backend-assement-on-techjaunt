import { AppDataSource } from "../../../database/datasource";
import { Vehicle } from "../../../entities/Vehicle.entity";

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
