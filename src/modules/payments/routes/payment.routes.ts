import { Router } from "express";

import { PaymentController } from "../controllers/payment.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { validateDto } from "../../../middlewares/validate.middleware";

import { InitializePaymentDto } from "../dto/initialize-payment.dto";

const router = Router();

const paymentController = new PaymentController();
router.post(
  "/initialize",
  authenticate,
  validateDto(InitializePaymentDto),
  paymentController.initialize.bind(paymentController),
);

router.get(
  "/verify/:reference",
  authenticate,
  paymentController.verify.bind(paymentController),
);
export default router;
