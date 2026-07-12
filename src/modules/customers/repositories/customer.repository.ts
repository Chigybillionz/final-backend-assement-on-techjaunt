import { AppDataSource } from "../../../database/datasource";

import { Booking } from "../../../entities/Booking.entity";
import { Payment } from "../../../entities/Payment.entity";
import { User } from "../../../entities/User.entity";

import { BookingStatus } from "../../../enums/booking-status.enum";
import { PaymentStatus } from "../../../enums/payment-status.enum";

export class CustomerRepository {
  private readonly bookingRepository = AppDataSource.getRepository(Booking);

  private readonly paymentRepository = AppDataSource.getRepository(Payment);

  private readonly userRepository = AppDataSource.getRepository(User);

  async countBookings(customerId: string): Promise<number> {
    return this.bookingRepository.count({
      where: {
        customer: {
          id: customerId,
        },
      },
    });
  }

  async countPendingBookings(customerId: string): Promise<number> {
    return this.bookingRepository.count({
      where: {
        customer: {
          id: customerId,
        },
        status: BookingStatus.PENDING,
      },
    });
  }

  async countConfirmedBookings(customerId: string): Promise<number> {
    return this.bookingRepository.count({
      where: {
        customer: {
          id: customerId,
        },
        status: BookingStatus.CONFIRMED,
      },
    });
  }

  async countCompletedBookings(customerId: string): Promise<number> {
    return this.bookingRepository.count({
      where: {
        customer: {
          id: customerId,
        },
        paymentStatus: PaymentStatus.SUCCESS,
      },
    });
  }

  async getTotalSpent(customerId: string): Promise<number> {
    const result = await this.bookingRepository
      .createQueryBuilder("booking")
      .select("SUM(booking.totalPrice)", "totalSpent")
      .where("booking.customerId = :customerId", {
        customerId,
      })
      .andWhere("booking.paymentStatus = :status", {
        status: PaymentStatus.SUCCESS,
      })
      .getRawOne();

    return Number(result?.totalSpent ?? 0);
  }

  async findBookings(customerId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        customer: {
          id: customerId,
        },
      },
      relations: {
        vehicle: true,
        payment: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findPayments(customerId: string): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: {
        booking: {
          customer: {
            id: customerId,
          },
        },
      },
      relations: {
        booking: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findProfile(customerId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id: customerId,
      },
    });
  }
}
