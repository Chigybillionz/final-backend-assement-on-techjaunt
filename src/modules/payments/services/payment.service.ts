import crypto from "crypto";
import { PaymentRepository } from "../repositories/payment.repository";
import { BookingRepository } from "../../bookings/repositories/booking.repository";

import { InitializePaymentDto } from "../dto/initialize-payment.dto";

import { Booking } from "../../../entities/Booking.entity";

import { NotFoundError } from "../../../utils/errors/NotFoundError";
import { ConflictError } from "../../../utils/errors/ConflictError";

export class PaymentService {
  private readonly paymentRepository = new PaymentRepository();

  private readonly bookingRepository = new BookingRepository();

  async initialize(data: InitializePaymentDto): Promise<Booking> {
    const booking = await this.bookingRepository.findById(data.bookingId);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.paymentStatus === "paid") {
      throw new ConflictError("Booking has already been paid");
    }

    const reference = `AUTOLEASE-${crypto.randomUUID()}`;

    await this.paymentRepository.create({
      booking,
      amount: booking.totalPrice,
      reference,
      status: "pending",
      gateway: "paystack",
    });

    return booking;
  }
}
