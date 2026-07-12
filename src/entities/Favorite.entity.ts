import { Entity, ManyToOne, JoinColumn } from "typeorm";

import { AppBaseEntity } from "./AppBaseEntity";
import { User } from "./User.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity("favorites")
export class Favorite extends AppBaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({
    name: "customerId",
  })
  customer!: User;

  @ManyToOne(() => Vehicle)
  @JoinColumn({
    name: "vehicleId",
  })
  vehicle!: Vehicle;
}
