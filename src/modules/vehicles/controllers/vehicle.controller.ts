import { Request, Response, NextFunction } from "express";

import { VehicleService } from "../services/vehicle.service";

import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";

import { Vehicle } from "../../../entities/Vehicle.entity";

export class VehicleController {
  private readonly vehicleService = new VehicleService();

  private formatVehicle(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      pricePerDay: vehicle.pricePerDay,
      available: vehicle.available,
      image: vehicle.image,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,

      owner: vehicle.owner
        ? {
            id: vehicle.owner.id,
            firstName: vehicle.owner.firstName,
            lastName: vehicle.owner.lastName,
            email: vehicle.owner.email,
            phone: vehicle.owner.phone,
            role: vehicle.owner.role,
          }
        : null,
    };
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vehicle = await this.vehicleService.create(
        req.user!,
        req.body as CreateVehicleDto,
      );

      res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
        data: this.formatVehicle(vehicle),
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const vehicles = await this.vehicleService.findAll();

      res.status(200).json({
        success: true,
        data: vehicles.map((vehicle) => this.formatVehicle(vehicle)),
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const vehicle = await this.vehicleService.findById(req.params.id);

      res.status(200).json({
        success: true,
        data: this.formatVehicle(vehicle),
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vehicle = await this.vehicleService.update(
        req.params.id,
        req.user!,
        req.body as UpdateVehicleDto,
      );

      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: this.formatVehicle(vehicle),
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.vehicleService.delete(req.params.id, req.user!);

      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
