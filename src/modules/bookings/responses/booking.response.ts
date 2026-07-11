import { Booking } from "../../../entities/Booking.entity";

import { UserResponse } from "../../auth/responses/user.response";
import { VehicleResponse } from "../../vehicles/responses/vehicle.response";

export class BookingResponse {
  id: string;

  customer: UserResponse;

  vehicle: VehicleResponse;

  pickupDate: Date;

  returnDate: Date;

  totalPrice: number;

  status: string;

  paymentStatus: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(booking: Booking) {
    this.id = booking.id;

    this.customer = new UserResponse(booking.customer);

    this.vehicle = new VehicleResponse(booking.vehicle);

    this.pickupDate = booking.pickupDate;

    this.returnDate = booking.returnDate;

    this.totalPrice = Number(booking.totalPrice);

    this.status = booking.status;

    this.paymentStatus = booking.paymentStatus;

    this.createdAt = booking.createdAt;

    this.updatedAt = booking.updatedAt;
  }
}
