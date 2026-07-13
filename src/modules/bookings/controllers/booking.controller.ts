import { Request, Response, NextFunction } from "express";

import { BookingService } from "../services/booking.service";

import { CreateBookingDto } from "../dto/create-booking.dto";
import { BookingResponse } from "../responses/booking.response";

export class BookingController {
  private readonly bookingService = new BookingService();

  /**
   * Create Booking
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const booking = await this.bookingService.create(
        req.user!,
        req.body as CreateBookingDto,
      );

      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: new BookingResponse(booking),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get All Bookings
   */
  async findAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const bookings = await this.bookingService.findAll();

      res.status(200).json({
        success: true,
        data: bookings.map((booking) => new BookingResponse(booking)),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Booking By ID
   */
  async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const booking = await this.bookingService.findById(req.params.id);

      res.status(200).json({
        success: true,
        data: new BookingResponse(booking),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Confirm Booking
   */
  async confirmBooking(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const booking = await this.bookingService.confirmBooking(
        req.params.id,
        req.user!,
      );

      res.status(200).json({
        success: true,
        message: "Booking confirmed successfully",
        data: new BookingResponse(booking),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Cancel Booking
   */
  async cancelBooking(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const booking = await this.bookingService.cancelBooking(
        req.params.id,
        req.user!,
      );

      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: new BookingResponse(booking),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Complete Booking
   */
  async completeBooking(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const booking = await this.bookingService.completeBooking(
        req.params.id,
        req.user!,
      );

      res.status(200).json({
        success: true,
        message: "Booking completed successfully",
        data: new BookingResponse(booking),
      });
    } catch (error) {
      next(error);
    }
  }
}
