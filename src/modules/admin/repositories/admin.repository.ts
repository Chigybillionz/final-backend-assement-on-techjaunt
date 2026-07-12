import { AppDataSource } from "../../../database/datasource";

import { User } from "../../../entities/User.entity";
import { Vehicle } from "../../../entities/Vehicle.entity";
import { Booking } from "../../../entities/Booking.entity";
import { Payment } from "../../../entities/Payment.entity";
import { Review } from "../../../entities/Review.entity";
import { Favorite } from "../../../entities/Favorite.entity";

import { UserRole } from "../../../enums/user-role.enum";
import { BookingStatus } from "../../../enums/booking-status.enum";
import { PaymentStatus } from "../../../enums/payment-status.enum";

export class AdminRepository {
  private readonly userRepository = AppDataSource.getRepository(User);

  private readonly vehicleRepository = AppDataSource.getRepository(Vehicle);

  private readonly bookingRepository = AppDataSource.getRepository(Booking);

  private readonly paymentRepository = AppDataSource.getRepository(Payment);

  private readonly reviewRepository = AppDataSource.getRepository(Review);

  private readonly favoriteRepository = AppDataSource.getRepository(Favorite);

  /**
   * User Statistics
   */
  async getUserStats() {
    const totalUsers = await this.userRepository.count();

    const totalCustomers = await this.userRepository.count({
      where: {
        role: UserRole.CUSTOMER,
      },
    });

    const totalOwners = await this.userRepository.count({
      where: {
        role: UserRole.OWNER,
      },
    });

    const totalAdmins = await this.userRepository.count({
      where: {
        role: UserRole.ADMIN,
      },
    });

    return {
      totalUsers,
      totalCustomers,
      totalOwners,
      totalAdmins,
    };
  }

  /**
   * Vehicle Statistics
   */
  async getVehicleStats() {
    const totalVehicles = await this.vehicleRepository.count();

    const availableVehicles = await this.vehicleRepository.count({
      where: {
        available: true,
      },
    });

    const unavailableVehicles = totalVehicles - availableVehicles;

    return {
      totalVehicles,
      availableVehicles,
      unavailableVehicles,
    };
  }
  /**
   * Booking Statistics
   */
  async getBookingStats() {
    const totalBookings = await this.bookingRepository.count();

    const pendingBookings = await this.bookingRepository.count({
      where: {
        status: BookingStatus.PENDING,
      },
    });

    const confirmedBookings = await this.bookingRepository.count({
      where: {
        status: BookingStatus.CONFIRMED,
      },
    });

    const cancelledBookings = await this.bookingRepository.count({
      where: {
        status: BookingStatus.CANCELLED,
      },
    });

    const completedBookings = await this.bookingRepository.count({
      where: {
        status: BookingStatus.COMPLETED,
      },
    });

    return {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
    };
  }

  /**
   * Payment Statistics
   */
  async getPaymentStats() {
    const totalPayments = await this.paymentRepository.count();

    const successfulPayments = await this.paymentRepository.count({
      where: {
        status: PaymentStatus.SUCCESS,
      },
    });

    const pendingPayments = await this.paymentRepository.count({
      where: {
        status: PaymentStatus.PENDING,
      },
    });

    const failedPayments = await this.paymentRepository.count({
      where: {
        status: PaymentStatus.FAILED,
      },
    });

    const revenueResult = await this.paymentRepository
      .createQueryBuilder("payment")
      .select("SUM(payment.amount)", "totalRevenue")
      .where("payment.status = :status", {
        status: PaymentStatus.SUCCESS,
      })
      .getRawOne();

    return {
      totalPayments,
      successfulPayments,
      pendingPayments,
      failedPayments,
      totalRevenue: Number(revenueResult?.totalRevenue ?? 0),
    };
  }

  /**
   * Review Statistics
   */
  async getReviewStats() {
    const totalReviews = await this.reviewRepository.count();

    const averageResult = await this.reviewRepository
      .createQueryBuilder("review")
      .select("AVG(review.rating)", "averageRating")
      .getRawOne();

    return {
      totalReviews,
      averageRating: Number(averageResult?.averageRating ?? 0),
    };
  }

  /**
   * Favorite Statistics
   */
  async getFavoriteStats() {
    const totalFavorites = await this.favoriteRepository.count();

    return {
      totalFavorites,
    };
  }
}
