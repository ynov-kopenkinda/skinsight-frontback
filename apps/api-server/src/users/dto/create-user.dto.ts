import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsString()
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
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNumber()
  heightInCm: number;

  @ApiProperty()
  @IsNumber()
  weightInKg: number;

  @ApiProperty()
  @IsString()
  ssn: string;
}
