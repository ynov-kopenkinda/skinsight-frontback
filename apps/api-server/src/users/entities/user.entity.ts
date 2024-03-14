import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsEmail,
  IsNumber,
  MaxLength,
  MinLength,
} from "class-validator";

export class User {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(25)
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(50)
  firstName: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(50)
  lastName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  heightInCm: number;

  @ApiProperty()
  weightInKg: number;

  @ApiProperty()
  ssn: string;

  @ApiProperty()
  proDoctorNumber: string;

  @ApiProperty()
  userRole: string;
}
