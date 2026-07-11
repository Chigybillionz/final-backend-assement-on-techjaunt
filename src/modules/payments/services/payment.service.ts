import crypto from "crypto";

import { PaymentRepository } from "../repositories/payment.repository";
import { BookingRepository } from "../../bookings/repositories/booking.repository";

import { InitializePaymentDto } from "../dto/initialize-payment.dto";

import { paystack } from "../../../utils/paystack";

import { NotFoundError } from "../../../utils/errors/NotFoundError";
import { ConflictError } from "../../../utils/errors/ConflictError";

import { BookingStatus } from "../../../enums/booking-status.enum";
import { PaymentStatus } from "../../../enums/payment-status.enum";
import { PaymentGateway } from "../../../enums/payment-gateway.enum";

export class PaymentService {
  private readonly paymentRepository = new PaymentRepository();

  private readonly bookingRepository = new BookingRepository();

  async initialize(data: InitializePaymentDto) {
    const booking = await this.bookingRepository.findById(data.bookingId);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.paymentStatus === PaymentStatus.SUCCESS) {
      throw new ConflictError("Booking has already been paid");
    }

    const reference = `AUTOLEASE-${crypto.randomUUID()}`;

    const payment = await this.paymentRepository.create({
      booking,
      amount: booking.totalPrice,
      reference,
      status: PaymentStatus.PENDING,
      gateway: PaymentGateway.PAYSTACK,
    });

    const response = await paystack.post("/transaction/initialize", {
      email: booking.customer.email,
      amount: Number(booking.totalPrice) * 100,
      reference,
      metadata: {
        bookingId: booking.id,
      },
    });

    return {
      payment,
      authorizationUrl: response.data.data.authorization_url,
      accessCode: response.data.data.access_code,
      reference,
    };
  }

  async verify(reference: string) {
    const payment = await this.paymentRepository.findByReference(reference);

    if (!payment) {
      throw new NotFoundError("Payment not found");
    }

    const response = await paystack.get(`/transaction/verify/${reference}`);

    if (!response.data.status) {
      throw new ConflictError("Unable to verify payment");
    }

    const transaction = response.data.data;

    if (transaction.status !== "success") {
      throw new ConflictError("Payment not successful");
    }

    const updatedPayment = await this.paymentRepository.update(payment.id, {
      status: PaymentStatus.SUCCESS,
    });

    if (!updatedPayment) {
      throw new NotFoundError("Payment not found after update");
    }

    await this.bookingRepository.update(payment.booking.id, {
      paymentStatus: PaymentStatus.SUCCESS,
      status: BookingStatus.CONFIRMED,
    });

    return updatedPayment;
  }
}
