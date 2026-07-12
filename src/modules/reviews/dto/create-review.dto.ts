import { IsUUID, IsInt, Min, Max, IsString, MaxLength } from "class-validator";

export class CreateReviewDto {
  @IsUUID()
  vehicleId!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  @MaxLength(1000)
  comment!: string;
}
