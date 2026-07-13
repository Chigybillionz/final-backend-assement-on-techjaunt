import { Router } from "express";

import { BookingController } from "../controllers/booking.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { validateDto } from "../../../middlewares/validate.middleware";

import { UserRole } from "../../../enums/user-role.enum";

import { CreateBookingDto } from "../dto/create-booking.dto";

const router = Router();

const bookingController = new BookingController();

/**
 * Get All Bookings
 */
router.get(
  "/",
  authenticate,
  bookingController.findAll.bind(bookingController),
);

/**
 * Get Booking By ID
 */
router.get(
  "/:id",
  authenticate,
  bookingController.findById.bind(bookingController),
);

/**
 * Create Booking
 */
router.post(
  "/",
  authenticate,
  authorize(UserRole.CUSTOMER),
  validateDto(CreateBookingDto),
  bookingController.create.bind(bookingController),
);

/**
 * Confirm Booking
 */
router.patch(
  "/:id/confirm",
  authenticate,
  authorize(UserRole.OWNER),
  bookingController.confirmBooking.bind(bookingController),
);

/**
 * Cancel Booking
 */
router.patch(
  "/:id/cancel",
  authenticate,
  authorize(UserRole.OWNER),
  bookingController.cancelBooking.bind(bookingController),
);

/**
 * Complete Booking
 */
router.patch(
  "/:id/complete",
  authenticate,
  authorize(UserRole.OWNER),
  bookingController.completeBooking.bind(bookingController),
);

export default router;
