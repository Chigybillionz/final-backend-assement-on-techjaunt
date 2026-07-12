import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";

import { AppBaseEntity } from "./AppBaseEntity";
import { User } from "./User.entity";
import { Review } from "./Review.entity";
import { Favorite } from "./Favorite.entity";
@Entity("vehicles")
export class Vehicle extends AppBaseEntity {
  @Column()
  brand!: string;

  @Column()
  model!: string;

  @Column()
  year!: number;

  @Column()
  color!: string;

  @Column()
  transmission!: string;

  @Column()
  fuelType!: string;

  @Column("decimal")
  pricePerDay!: number;

  @Column({
    default: true,
  })
  available!: boolean;

  @Column({
    nullable: true,
  })
  image!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "ownerId",
  })
  owner!: User;
  @OneToMany(() => Review, (review) => review.vehicle)
  reviews?: Review[];
  @OneToMany(() => Favorite, (favorite) => favorite.vehicle)
  favorites?: Favorite[];
}
