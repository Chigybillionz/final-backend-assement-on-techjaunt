import { User } from "../../../entities/User.entity";

import { CustomerRepository } from "../repositories/customer.repository";

import { NotFoundError } from "../../../utils/errors/NotFoundError";

export class CustomerService {
  private readonly customerRepository = new CustomerRepository();

  /**
   * Customer Dashboard
   */
  async getDashboard(customer: User) {
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      totalSpent,
    ] = await Promise.all([
      this.customerRepository.countBookings(customer.id),
      this.customerRepository.countPendingBookings(customer.id),
      this.customerRepository.countConfirmedBookings(customer.id),
      this.customerRepository.countCompletedBookings(customer.id),
      this.customerRepository.getTotalSpent(customer.id),
    ]);

    return {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      totalSpent,
    };
  }

  /**
   * Get Customer Bookings
   */
  async getBookings(customer: User) {
    return this.customerRepository.findBookings(customer.id);
  }

  /**
   * Get Customer Payments
   */
  async getPayments(customer: User) {
    return this.customerRepository.findPayments(customer.id);
  }

  /**
   * Get Customer Profile
   */
  async getProfile(customer: User) {
    const profile = await this.customerRepository.findProfile(customer.id);

    if (!profile) {
      throw new NotFoundError("Customer not found");
    }

    return profile;
  }
}
