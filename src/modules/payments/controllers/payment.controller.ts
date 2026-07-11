import { Request, Response, NextFunction } from "express";

import { PaymentService } from "../services/payment.service";
import { InitializePaymentDto } from "../dto/initialize-payment.dto";

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
        data: result,
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
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  }
}
