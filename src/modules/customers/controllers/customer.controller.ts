import { Request, Response, NextFunction } from "express";

import { CustomerService } from "../services/customer.service";

import { BookingResponse } from "../../bookings/responses/booking.response";
import { PaymentResponse } from "../../payments/responses/payment.response";
import { UserResponse } from "../../auth/responses/user.response";

import { Booking } from "../../../entities/Booking.entity";
import { Payment } from "../../../entities/Payment.entity";

export class CustomerController {
  private readonly customerService = new CustomerService();

  /**
   * GET /customers/dashboard
   */
  async getDashboard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dashboard = await this.customerService.getDashboard(req.user!);

      res.status(200).json({
        success: true,
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /customers/bookings
   */
  async getBookings(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const bookings = await this.customerService.getBookings(req.user!);

      res.status(200).json({
        success: true,
        data: bookings.map((booking: Booking) => new BookingResponse(booking)),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /customers/payments
   */
  async getPayments(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const payments = await this.customerService.getPayments(req.user!);

      res.status(200).json({
        success: true,
        data: payments.map((payment: Payment) => new PaymentResponse(payment)),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /customers/profile
   */
  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const profile = await this.customerService.getProfile(req.user!);

      res.status(200).json({
        success: true,
        data: new UserResponse(profile),
      });
    } catch (error) {
      next(error);
    }
  }
}
