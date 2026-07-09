import { IsUUID, IsDateString } from "class-validator";

export class CreateBookingDto {
  @IsUUID()
  vehicleId!: string;

  @IsDateString()
  pickupDate!: string;

  @IsDateString()
  returnDate!: string;
}
