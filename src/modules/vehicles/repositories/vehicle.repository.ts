import { AppDataSource } from "../../../database/datasource";
import { Vehicle } from "../../../entities/Vehicle.entity";

export class VehicleRepository {
  private readonly repository = AppDataSource.getRepository(Vehicle);

  async create(data: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = this.repository.create(data);
    return this.repository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.repository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findById(id: string): Promise<Vehicle | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(id: string, data: Partial<Vehicle>): Promise<Vehicle | null> {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
