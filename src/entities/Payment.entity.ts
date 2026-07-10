import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

import { AppBaseEntity } from "./AppBaseEntity";
import { Booking } from "./Booking.entity";

@Entity("payments")
export class Payment extends AppBaseEntity {
  @OneToOne(() => Booking)
  @JoinColumn({
    name: "bookingId",
  })
  booking!: Booking;

  @Column({
    unique: true,
  })
  reference!: string;

  @Column({
    type: "decimal",
  })
  amount!: number;

  @Column({
    default: "pending",
  })
  status!: string;

  @Column({
    default: "paystack",
  })
  gateway!: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  paidAt?: Date;
}
