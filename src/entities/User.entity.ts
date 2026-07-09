import { Entity, Column, OneToMany } from "typeorm";

import { AppBaseEntity } from "./AppBaseEntity";
import { Booking } from "./Booking.entity";
import { UserRole } from "../enums/user-role.enum";

@Entity("users")
export class User extends AppBaseEntity {
  // Relationships
  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings!: Booking[];

  @Column({
    length: 100,
  })
  firstName!: string;

  @Column({
    length: 100,
  })
  lastName!: string;

  @Column({
    unique: true,
    length: 150,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    nullable: true,
    length: 20,
  })
  phone?: string;

  @Column({
    nullable: true,
  })
  profileImage?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role!: UserRole;

  @Column({
    default: false,
  })
  isEmailVerified!: boolean;

  @Column({
    default: false,
  })
  isVerifiedOwner!: boolean;

  @Column({
    default: true,
  })
  isActive!: boolean;

  @Column({
    nullable: true,
  })
  provider?: string;

  @Column({
    nullable: true,
  })
  providerId?: string;

  @Column({
    nullable: true,
  })
  refreshToken?: string;

  @Column({
    nullable: true,
  })
  emailVerificationToken?: string;

  @Column({
    nullable: true,
  })
  passwordResetToken?: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  passwordResetExpires?: Date;
}
