import { Request, Response, NextFunction } from "express";

import { OwnerService } from "../services/owner.service";

import { VehicleResponse } from "../../vehicles/responses/vehicle.response";
import { BookingResponse } from "../../bookings/responses/booking.response";

export class OwnerController {
  private readonly ownerService = new OwnerService();

  /**
   * GET /owners/dashboard
   */
  async getDashboard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dashboard = await this.ownerService.getDashboard(req.user!);

      res.status(200).json({
        success: true,
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /owners/vehicles
   */
  async getVehicles(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const vehicles = await this.ownerService.getVehicles(req.user!);

      res.status(200).json({
        success: true,
        data: vehicles.map((vehicle) => new VehicleResponse(vehicle)),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /owners/bookings
   */
  async getBookings(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const bookings = await this.ownerService.getBookings(req.user!);

      res.status(200).json({
        success: true,
        data: bookings.map((booking) => new BookingResponse(booking)),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /owners/revenue
   */
  async getRevenue(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const revenue = await this.ownerService.getRevenue(req.user!);

      res.status(200).json({
        success: true,
        data: revenue,
      });
    } catch (error) {
      next(error);
    }
  }
}
