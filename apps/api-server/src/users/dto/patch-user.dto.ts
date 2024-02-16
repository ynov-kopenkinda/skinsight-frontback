import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class PatchUserDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(25)
  @MinLength(8)
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(50)
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(50)
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  heightInCm: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  weightInKg: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  ssn: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  proDoctorNumber: string;
}
