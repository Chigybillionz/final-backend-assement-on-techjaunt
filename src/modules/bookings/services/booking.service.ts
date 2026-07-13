import { BookingRepository } from "../repositories/booking.repository";
import { VehicleRepository } from "../../vehicles/repositories/vehicle.repository";

import { CreateBookingDto } from "../dto/create-booking.dto";

import { Booking } from "../../../entities/Booking.entity";
import { User } from "../../../entities/User.entity";

import { NotFoundError } from "../../../utils/errors/NotFoundError";
import { ForbiddenError } from "../../../utils/errors/ForbiddenError";
import { ConflictError } from "../../../utils/errors/ConflictError";

import { BookingStatus } from "../../../enums/booking-status.enum";
import { PaymentStatus } from "../../../enums/payment-status.enum";

export class BookingService {
  private readonly bookingRepository = new BookingRepository();

  private readonly vehicleRepository = new VehicleRepository();

  /**
   * Create Booking
   */
  async create(customer: User, data: CreateBookingDto): Promise<Booking> {
    // Check if the vehicle exists
    const vehicle = await this.vehicleRepository.findById(data.vehicleId);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    // Prevent owners from booking their own vehicles
    if (vehicle.owner.id === customer.id) {
      throw new ForbiddenError("You cannot book your own vehicle");
    }

    // Validate booking dates
    const pickupDate = new Date(data.pickupDate);
    const returnDate = new Date(data.returnDate);

    if (pickupDate >= returnDate) {
      throw new ForbiddenError("Return date must be after pickup date");
    }

    // Check if vehicle is already booked
    const existingBooking = await this.bookingRepository.findOverlappingBooking(
      vehicle.id,
      pickupDate,
      returnDate,
    );

    if (existingBooking) {
      throw new ConflictError(
        "Vehicle is already booked for the selected dates",
      );
    }

    // Calculate rental duration
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const rentalDays = Math.ceil(
      (returnDate.getTime() - pickupDate.getTime()) / millisecondsPerDay,
    );

    // Calculate total price
    const totalPrice = Number(vehicle.pricePerDay) * rentalDays;

    // Create booking
    return this.bookingRepository.create({
      customer,
      vehicle,
      pickupDate,
      returnDate,
      totalPrice,
      status: BookingStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
    });
  }

  /**
   * Get All Bookings
   */
  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.findAll();
  }

  /**
   * Get Booking By ID
   */
  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    return booking;
  }

  /**
   * Confirm Booking
   */
  async confirmBooking(id: string, owner: User): Promise<Booking> {
    const booking = await this.bookingRepository.findByIdWithRelations(id);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.vehicle.owner.id !== owner.id) {
      throw new ForbiddenError("You are not allowed to confirm this booking");
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new ConflictError("Only pending bookings can be confirmed");
    }

    const updatedBooking = await this.bookingRepository.updateStatus(
      id,
      BookingStatus.CONFIRMED,
    );

    return updatedBooking!;
  }

  /**
   * Cancel Booking
   */
  async cancelBooking(id: string, owner: User): Promise<Booking> {
    const booking = await this.bookingRepository.findByIdWithRelations(id);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.vehicle.owner.id !== owner.id) {
      throw new ForbiddenError("You are not allowed to cancel this booking");
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new ConflictError("Only pending bookings can be cancelled");
    }

    const updatedBooking = await this.bookingRepository.updateStatus(
      id,
      BookingStatus.CANCELLED,
    );

    return updatedBooking!;
  }

  /**
   * Complete Booking
   */
  async completeBooking(id: string, owner: User): Promise<Booking> {
    const booking = await this.bookingRepository.findByIdWithRelations(id);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    if (booking.vehicle.owner.id !== owner.id) {
      throw new ForbiddenError("You are not allowed to complete this booking");
    }

    if (booking.status !== BookingStatus.CONFIRMED) {
      throw new ConflictError("Only confirmed bookings can be completed");
    }

    const updatedBooking = await this.bookingRepository.updateStatus(
      id,
      BookingStatus.COMPLETED,
    );

    return updatedBooking!;
  }
}
