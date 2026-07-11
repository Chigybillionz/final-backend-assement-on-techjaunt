import { Request, Response, NextFunction } from "express";

import { PaymentService } from "../services/payment.service";
import { InitializePaymentDto } from "../dto/initialize-payment.dto";
import { PaymentResponse } from "../responses/payment.response";

export class PaymentController {
  private readonly paymentService = new PaymentService();

  async initialize(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.paymentService.initialize(
        req.body as InitializePaymentDto,
      );

      res.status(200).json({
        success: true,
        message: "Payment initialized successfully",
        data: {
          ...result,
          payment: new PaymentResponse(result.payment),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async verify(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payment = await this.paymentService.verify(req.params.reference);

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: new PaymentResponse(payment),
      });
    } catch (error) {
      next(error);
    }
  }
}
