import { AdminRepository } from "../repositories/admin.repository";

export class AdminService {
  private readonly adminRepository = new AdminRepository();

  /**
   * Get Dashboard Statistics
   */
  async getDashboard() {
    const [
      userStats,
      vehicleStats,
      bookingStats,
      paymentStats,
      reviewStats,
      favoriteStats,
    ] = await Promise.all([
      this.adminRepository.getUserStats(),
      this.adminRepository.getVehicleStats(),
      this.adminRepository.getBookingStats(),
      this.adminRepository.getPaymentStats(),
      this.adminRepository.getReviewStats(),
      this.adminRepository.getFavoriteStats(),
    ]);

    return {
      ...userStats,
      ...vehicleStats,
      ...bookingStats,
      ...paymentStats,
      ...reviewStats,
      ...favoriteStats,
    };
  }
}
