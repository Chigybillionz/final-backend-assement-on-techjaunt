import { Router } from "express";

import { BookingController } from "../controllers/booking.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { validateDto } from "../../../middlewares/validate.middleware";

import { UserRole } from "../../../enums/user-role.enum";

import { CreateBookingDto } from "../dto/create-booking.dto";

const router = Router();

const bookingController = new BookingController();

router.get(
  "/",
  authenticate,
  bookingController.findAll.bind(bookingController),
);

router.get(
  "/:id",
  authenticate,
  bookingController.findById.bind(bookingController),
);

router.post(
  "/",
  authenticate,
  authorize(UserRole.CUSTOMER),
  validateDto(CreateBookingDto),
  bookingController.create.bind(bookingController),
);

export default router;
