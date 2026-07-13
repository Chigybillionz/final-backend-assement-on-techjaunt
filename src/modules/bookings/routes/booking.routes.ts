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
 * @openapi
 * /bookings:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get all bookings
 *     description: Returns all bookings in the system.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authenticate,
  bookingController.findAll.bind(bookingController),
);

/**
 * @openapi
 * /bookings/{id}:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get booking by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking retrieved successfully
 *       404:
 *         description: Booking not found
 */
router.get(
  "/:id",
  authenticate,
  bookingController.findById.bind(bookingController),
);

/**
 * @openapi
 * /bookings:
 *   post:
 *     tags:
 *       - Bookings
 *     summary: Create a booking
 *     description: Customer creates a new vehicle booking.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleId
 *               - pickupDate
 *               - returnDate
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 example: 816568c2-e2d8-4d43-a4c3-462f955ef0fc
 *               pickupDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-20
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-25
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authenticate,
  authorize(UserRole.CUSTOMER),
  validateDto(CreateBookingDto),
  bookingController.create.bind(bookingController),
);

/**
 * @openapi
 * /bookings/{id}/confirm:
 *   patch:
 *     tags:
 *       - Bookings
 *     summary: Confirm a booking
 *     description: Vehicle owner confirms a pending booking.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking confirmed successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Booking not found
 */
router.patch(
  "/:id/confirm",
  authenticate,
  authorize(UserRole.OWNER),
  bookingController.confirmBooking.bind(bookingController),
);

/**
 * @openapi
 * /bookings/{id}/cancel:
 *   patch:
 *     tags:
 *       - Bookings
 *     summary: Cancel a booking
 *     description: Vehicle owner cancels a pending booking.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Booking not found
 */
router.patch(
  "/:id/cancel",
  authenticate,
  authorize(UserRole.OWNER),
  bookingController.cancelBooking.bind(bookingController),
);

/**
 * @openapi
 * /bookings/{id}/complete:
 *   patch:
 *     tags:
 *       - Bookings
 *     summary: Complete a booking
 *     description: Vehicle owner marks a confirmed booking as completed.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking completed successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Booking not found
 */
router.patch(
  "/:id/complete",
  authenticate,
  authorize(UserRole.OWNER),
  bookingController.completeBooking.bind(bookingController),
);

export default router;
