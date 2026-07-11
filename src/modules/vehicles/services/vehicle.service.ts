import { VehicleRepository } from "../repositories/vehicle.repository";

import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";

import { Vehicle } from "../../../entities/Vehicle.entity";
import { User } from "../../../entities/User.entity";

import { NotFoundError } from "../../../utils/errors/NotFoundError";
import { ForbiddenError } from "../../../utils/errors/ForbiddenError";
import { QueryVehicleDto } from "../dto/query-vehicle.dto";
export class VehicleService {
  private readonly vehicleRepository = new VehicleRepository();

  async create(owner: User, data: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleRepository.create({
      ...data,
      owner,
    });
  }
  async findAll(query: QueryVehicleDto) {
    return this.vehicleRepository.findWithFilters(query);
  }

  async findById(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(id);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    return vehicle;
  }

  async update(
    id: string,
    owner: User,
    data: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.findById(id);

    if (vehicle.owner.id !== owner.id) {
      throw new ForbiddenError("You are not allowed to update this vehicle");
    }

    const updatedVehicle = await this.vehicleRepository.update(id, data);

    if (!updatedVehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    return updatedVehicle;
  }

  async delete(id: string, owner: User): Promise<void> {
    const vehicle = await this.findById(id);

    if (vehicle.owner.id !== owner.id) {
      throw new ForbiddenError("You are not allowed to delete this vehicle");
    }

    await this.vehicleRepository.delete(id);
  }
}
