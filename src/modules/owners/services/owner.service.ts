import { User } from "../../../entities/User.entity";

import { OwnerRepository } from "../repositories/owner.repository";

export class OwnerService {
  private readonly ownerRepository = new OwnerRepository();

  /**
   * Owner Dashboard
   */
  async getDashboard(owner: User) {
    const [
      totalVehicles,
      availableVehicles,
      totalBookings,
      pendingBookings,
      completedBookings,
      totalRevenue,
    ] = await Promise.all([
      this.ownerRepository.countVehicles(owner.id),
      this.ownerRepository.countAvailableVehicles(owner.id),
      this.ownerRepository.countBookings(owner.id),
      this.ownerRepository.countPendingBookings(owner.id),
      this.ownerRepository.countCompletedBookings(owner.id),
      this.ownerRepository.getRevenue(owner.id),
    ]);

    return {
      totalVehicles,
      availableVehicles,
      totalBookings,
      pendingBookings,
      completedBookings,
      totalRevenue,
    };
  }

  /**
   * Get Owner Vehicles
   */
  async getVehicles(owner: User) {
    return this.ownerRepository.findOwnerVehicles(owner.id);
  }

  /**
   * Get Owner Bookings
   */
  async getBookings(owner: User) {
    return this.ownerRepository.findOwnerBookings(owner.id);
  }

  /**
   * Get Owner Revenue
   */
  async getRevenue(owner: User) {
    const totalRevenue = await this.ownerRepository.getRevenue(owner.id);

    return {
      totalRevenue,
    };
  }
}
