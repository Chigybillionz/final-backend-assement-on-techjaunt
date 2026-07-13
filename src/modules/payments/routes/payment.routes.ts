import { Router } from "express";

import { PaymentController } from "../controllers/payment.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { validateDto } from "../../../middlewares/validate.middleware";

import { InitializePaymentDto } from "../dto/initialize-payment.dto";

const router = Router();

const paymentController = new PaymentController();

/**
 * @openapi
 * /payments/initialize:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Initialize payment
 *     description: Initializes a payment for an existing booking and returns the payment authorization URL.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *             properties:
 *               bookingId:
 *                 type: string
 *                 example: 2aff817f-7893-490c-8e60-a88744800ab6
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.post(
  "/initialize",
  authenticate,
  validateDto(InitializePaymentDto),
  paymentController.initialize.bind(paymentController),
);

/**
 * @openapi
 * /payments/verify/{reference}:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Verify payment
 *     description: Verifies a payment using the payment reference returned by the payment gateway.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reference
 *         required: true
 *         schema:
 *           type: string
 *         example: psk_test_3fd93843838
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */
router.get(
  "/verify/:reference",
  authenticate,
  paymentController.verify.bind(paymentController),
);

export default router;
