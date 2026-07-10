import { Request, Response, NextFunction } from "express";

import { BookingService } from "../services/booking.service";

import { CreateBookingDto } from "../dto/create-booking.dto";

export class BookingController {
  private readonly bookingService = new BookingService();

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const booking = await this.bookingService.create(
        req.user!,
        req.body as CreateBookingDto,
      );

      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking,
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
      const bookings = await this.bookingService.findAll();

      res.status(200).json({
        success: true,
        data: bookings,
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
      const booking = await this.bookingService.findById(req.params.id);

      res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }
}
