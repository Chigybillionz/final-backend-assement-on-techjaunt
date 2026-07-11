import { Request, Response, NextFunction } from "express";

import { VehicleService } from "../services/vehicle.service";

import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";

import { VehicleResponse } from "../responses/vehicle.response";

export class VehicleController {
  private readonly vehicleService = new VehicleService();

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vehicle = await this.vehicleService.create(
        req.user!,
        req.body as CreateVehicleDto,
      );

      res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
        data: new VehicleResponse(vehicle),
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
        data: vehicles.map((vehicle) => new VehicleResponse(vehicle)),
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
        data: new VehicleResponse(vehicle),
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
        data: new VehicleResponse(vehicle),
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
