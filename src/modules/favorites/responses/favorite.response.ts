import { Favorite } from "../../../entities/Favorite.entity";

import { UserResponse } from "../../auth/responses/user.response";
import { VehicleResponse } from "../../vehicles/responses/vehicle.response";

export class FavoriteResponse {
  id: string;

  customer: UserResponse;

  vehicle: VehicleResponse;

  createdAt: Date;

  updatedAt: Date;

  constructor(favorite: Favorite) {
    this.id = favorite.id;

    this.customer = new UserResponse(favorite.customer);
    this.vehicle = new VehicleResponse(favorite.vehicle);

    this.createdAt = favorite.createdAt;
    this.updatedAt = favorite.updatedAt;
  }
}
