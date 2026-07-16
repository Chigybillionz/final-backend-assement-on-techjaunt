import { Entity, Column, OneToMany } from "typeorm";

import { AppBaseEntity } from "./AppBaseEntity";
import { Booking } from "./Booking.entity";
import { UserRole } from "../enums/user-role.enum";
import { Review } from "./Review.entity";
import { Favorite } from "./Favorite.entity";

@Entity("users")
export class User extends AppBaseEntity {
  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings!: Booking[];

  @OneToMany(() => Favorite, (favorite) => favorite.customer)
  favorites?: Favorite[];

  @OneToMany(() => Review, (review) => review.customer)
  reviews?: Review[];

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
    type: "text",
    nullable: true,
  })
  refreshToken!: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  emailVerificationToken!: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  passwordResetToken!: string | null;
  @Column({
    type: "timestamp",
    nullable: true,
  })
  passwordResetExpires!: Date | null;
}
