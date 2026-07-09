import { Between } from "typeorm";

import { AppDataSource } from "../../../database/datasource";
import { Booking } from "../../../entities/Booking.entity";

export class BookingRepository {
  private readonly repository = AppDataSource.getRepository(Booking);

  /**
   * Create Booking
   */
  async create(data: Partial<Booking>): Promise<Booking> {
    const booking = this.repository.create(data);

    return this.repository.save(booking);
  }

  /**
   * Get All Bookings
   */
  async findAll(): Promise<Booking[]> {
    return this.repository.find({
      relations: {
        customer: true,
        vehicle: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  /**
   * Get Booking By ID
   */
  async findById(id: string): Promise<Booking | null> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        customer: true,
        vehicle: true,
      },
    });
  }

  /**
   * Update Booking
   */
  async update(id: string, data: Partial<Booking>): Promise<Booking | null> {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  /**
   * Delete Booking
   */
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Check if a vehicle already has a booking
   * within a given date range.
   */
  async findOverlappingBooking(
    vehicleId: string,
    pickupDate: Date,
    returnDate: Date,
  ): Promise<Booking | null> {
    return this.repository.findOne({
      where: {
        vehicle: {
          id: vehicleId,
        },
        pickupDate: Between(pickupDate, returnDate),
      },
      relations: {
        vehicle: true,
      },
    });
  }
}
