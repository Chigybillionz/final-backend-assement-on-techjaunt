import { Between } from "typeorm";

import { AppDataSource } from "../../../database/datasource";
import { Booking } from "../../../entities/Booking.entity";
import { PaymentStatus } from "../../../enums/payment-status.enum";

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
   * Find completed booking for a customer and vehicle
   */
  async findCompletedBooking(
    customerId: string,
    vehicleId: string,
  ): Promise<Booking | null> {
    return this.repository.findOne({
      where: {
        customer: {
          id: customerId,
        },
        vehicle: {
          id: vehicleId,
        },
        paymentStatus: PaymentStatus.SUCCESS,
      },
      relations: {
        customer: true,
        vehicle: true,
      },
    });
  }

  /**
   * Check if a vehicle has an overlapping booking
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
