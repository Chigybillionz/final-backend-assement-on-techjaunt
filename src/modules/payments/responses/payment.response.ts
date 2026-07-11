import { Payment } from "../../../entities/Payment.entity";

import { BookingResponse } from "../../bookings/responses/booking.response";

export class PaymentResponse {
  id: string;

  booking: BookingResponse;

  reference: string;

  amount: number;

  gateway: string;

  status: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(payment: Payment) {
    this.id = payment.id;

    this.booking = new BookingResponse(payment.booking);

    this.reference = payment.reference;

    this.amount = Number(payment.amount);

    this.gateway = payment.gateway;

    this.status = payment.status;

    this.createdAt = payment.createdAt;

    this.updatedAt = payment.updatedAt;
  }
}
