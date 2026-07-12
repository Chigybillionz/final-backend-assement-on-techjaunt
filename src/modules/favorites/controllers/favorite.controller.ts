import { Request, Response, NextFunction } from "express";

import { FavoriteService } from "../services/favorite.service";

import { CreateFavoriteDto } from "../dto/create-favorite.dto";

import { FavoriteResponse } from "../responses/favorite.response";

export class FavoriteController {
  private readonly favoriteService = new FavoriteService();

  /**
   * Add Favorite
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const favorite = await this.favoriteService.create(
        req.user!,
        req.body as CreateFavoriteDto,
      );

      res.status(201).json({
        success: true,
        message: "Vehicle added to favorites successfully",
        data: new FavoriteResponse(favorite),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get My Favorites
   */
  async findMyFavorites(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const favorites = await this.favoriteService.findMyFavorites(req.user!);

      res.status(200).json({
        success: true,
        data: favorites.map((favorite) => new FavoriteResponse(favorite)),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Remove Favorite
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.favoriteService.delete(req.params.id, req.user!);

      res.status(200).json({
        success: true,
        message: "Favorite removed successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
