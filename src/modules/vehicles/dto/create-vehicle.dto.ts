import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  Max,
} from "class-validator";

export class CreateVehicleDto {
  @IsString()
  brand!: string;

  @IsString()
  model!: string;

  @IsNumber()
  @Min(1990)
  @Max(2100)
  year!: number;

  @IsString()
  color!: string;

  @IsString()
  transmission!: string;

  @IsString()
  fuelType!: string;

  @IsNumber()
  @Min(1)
  pricePerDay!: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @IsOptional()
  @IsString()
  image?: string;
}
