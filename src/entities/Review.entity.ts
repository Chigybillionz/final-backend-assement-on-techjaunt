import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { AppBaseEntity } from "./AppBaseEntity";
import { User } from "./User.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity("reviews")
export class Review extends AppBaseEntity {
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({
    name: "customerId",
  })
  customer!: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.reviews)
  @JoinColumn({
    name: "vehicleId",
  })
  vehicle!: Vehicle;

  @Column({
    type: "int",
  })
  rating!: number;

  @Column({
    type: "text",
  })
  comment!: string;
}
