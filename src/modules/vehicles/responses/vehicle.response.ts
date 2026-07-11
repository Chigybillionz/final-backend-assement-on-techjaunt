import { Vehicle } from "../../../entities/Vehicle.entity";
import { UserResponse } from "../../auth/responses/user.response";

export class VehicleResponse {
  id: string;

  brand: string;

  model: string;

  year: number;

  color: string;

  transmission: string;

  fuelType: string;

  pricePerDay: number;

  owner: UserResponse;

  createdAt: Date;

  updatedAt: Date;

  constructor(vehicle: Vehicle) {
    this.id = vehicle.id;
    this.brand = vehicle.brand;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.transmission = vehicle.transmission;
    this.fuelType = vehicle.fuelType;
    this.pricePerDay = Number(vehicle.pricePerDay);

    this.owner = new UserResponse(vehicle.owner);

    this.createdAt = vehicle.createdAt;
    this.updatedAt = vehicle.updatedAt;
  }
}
