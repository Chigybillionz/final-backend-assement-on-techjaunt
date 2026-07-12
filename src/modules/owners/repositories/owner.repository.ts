import { AppDataSource } from "../../../database/datasource";

import { Vehicle } from "../../../entities/Vehicle.entity";
import { Booking } from "../../../entities/Booking.entity";

import { BookingStatus } from "../../../enums/booking-status.enum";
import { PaymentStatus } from "../../../enums/payment-status.enum";

export class OwnerRepository {
  private readonly vehicleRepository = AppDataSource.getRepository(Vehicle);

  private readonly bookingRepository = AppDataSource.getRepository(Booking);

  /**
   * Count all vehicles owned by an owner
   */
  async countVehicles(ownerId: string): Promise<number> {
    return this.vehicleRepository.count({
      where: {
        owner: {
          id: ownerId,
        },
      },
    });
  }

  /**
   * Count available vehicles
   */
  async countAvailableVehicles(ownerId: string): Promise<number> {
    return this.vehicleRepository.count({
      where: {
        owner: {
          id: ownerId,
        },
        available: true,
      },
    });
  }

  /**
   * Count all bookings for owner's vehicles
   */
  async countBookings(ownerId: string): Promise<number> {
    return this.bookingRepository.count({
      where: {
        vehicle: {
          owner: {
            id: ownerId,
          },
        },
      },
    });
  }

  /**
   * Count pending bookings
   */
  async countPendingBookings(ownerId: string): Promise<number> {
    return this.bookingRepository.count({
      where: {
        vehicle: {
          owner: {
            id: ownerId,
          },
        },
        status: BookingStatus.PENDING,
      },
    });
  }

  /**
   * Count completed (paid) bookings
   */
  async countCompletedBookings(ownerId: string): Promise<number> {
    return this.bookingRepository.count({
      where: {
        vehicle: {
          owner: {
            id: ownerId,
          },
        },
        paymentStatus: PaymentStatus.SUCCESS,
      },
    });
  }

  /**
   * Calculate total revenue
   */
  async getRevenue(ownerId: string): Promise<number> {
    const result = await this.bookingRepository
      .createQueryBuilder("booking")
      .leftJoin("booking.vehicle", "vehicle")
      .leftJoin("vehicle.owner", "owner")
      .select("SUM(booking.totalPrice)", "totalRevenue")
      .where("owner.id = :ownerId", { ownerId })
      .andWhere("booking.paymentStatus = :status", {
        status: PaymentStatus.SUCCESS,
      })
      .getRawOne();

    return Number(result?.totalRevenue ?? 0);
  }

  /**
   * Get all vehicles owned by an owner
   */
  async findOwnerVehicles(ownerId: string): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      where: {
        owner: {
          id: ownerId,
        },
      },
      relations: {
        owner: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  /**
   * Get all bookings for owner's vehicles
   */
  async findOwnerBookings(ownerId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        vehicle: {
          owner: {
            id: ownerId,
          },
        },
      },
      relations: {
        customer: true,
        vehicle: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }
}
