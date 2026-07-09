import { BookingRepository } from "../repositories/booking.repository";

export class BookingService {
  private readonly bookingRepository = new BookingRepository();
}
