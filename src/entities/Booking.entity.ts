import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { AppBaseEntity } from "./AppBaseEntity";
import { User } from "./User.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity("bookings")
export class Booking extends AppBaseEntity {
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

  @Column({
    type: "date",
  })
  pickupDate!: Date;

  @Column({
    type: "date",
  })
  returnDate!: Date;

  @Column({
    type: "decimal",
  })
  totalPrice!: number;

  @Column({
    default: "pending",
  })
  status!: string;

  @Column({
    default: "pending",
  })
  paymentStatus!: string;
}
