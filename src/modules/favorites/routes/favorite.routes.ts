import { Router } from "express";

import { FavoriteController } from "../controllers/favorite.controller";

import { authenticate } from "../../../middlewares/auth.middleware";
import { authorize } from "../../../middlewares/authorize.middleware";
import { validateDto } from "../../../middlewares/validate.middleware";

import { UserRole } from "../../../enums/user-role.enum";

import { CreateFavoriteDto } from "../dto/create-favorite.dto";

const router = Router();

const favoriteController = new FavoriteController();

router.post(
  "/",
  authenticate,
  authorize(UserRole.CUSTOMER),
  validateDto(CreateFavoriteDto),
  favoriteController.create.bind(favoriteController),
);

router.get(
  "/my-favorites",
  authenticate,
  authorize(UserRole.CUSTOMER),
  favoriteController.findMyFavorites.bind(favoriteController),
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.CUSTOMER),
  favoriteController.delete.bind(favoriteController),
);

export default router;
