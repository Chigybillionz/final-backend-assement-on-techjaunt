import { Request, Response, NextFunction } from "express";

import { AdminService } from "../services/admin.service";
import { AdminDashboardResponse } from "../responses/admin.response";

export class AdminController {
  private readonly adminService = new AdminService();

  /**
   * Get Admin Dashboard
   */
  async getDashboard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dashboard = await this.adminService.getDashboard();

      res.status(200).json({
        success: true,
        data: new AdminDashboardResponse(dashboard),
      });
    } catch (error) {
      next(error);
    }
  }
}
