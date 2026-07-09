import { BookingRepository } from "../repositories/booking.repository";
import { VehicleRepository } from "../../vehicles/repositories/vehicle.repository";

import { NotFoundError } from "../../../utils/errors/NotFoundError";

export class BookingService {
  private readonly bookingRepository = new BookingRepository();

  private readonly vehicleRepository = new VehicleRepository();

  async findAll() {
    return this.bookingRepository.findAll();
  }

  async findById(id: string) {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    return booking;
  }
}
