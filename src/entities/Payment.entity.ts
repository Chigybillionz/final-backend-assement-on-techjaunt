import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

import { AppBaseEntity } from "./AppBaseEntity";
import { Booking } from "./Booking.entity";

import { PaymentStatus } from "../enums/payment-status.enum";
import { PaymentGateway } from "../enums/payment-gateway.enum";

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
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({
    type: "enum",
    enum: PaymentGateway,
    default: PaymentGateway.PAYSTACK,
  })
  gateway!: PaymentGateway;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  paidAt?: Date;
}
