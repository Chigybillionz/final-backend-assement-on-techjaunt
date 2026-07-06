import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from "class-validator";

import { UserRole } from "../../../enums/user-role.enum";

export class RegisterUserDto {
  @IsString()
  @Length(2, 100)
  firstName!: string;

  @IsString()
  @Length(2, 100)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
