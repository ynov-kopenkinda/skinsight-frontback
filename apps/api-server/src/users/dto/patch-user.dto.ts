import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class PatchUserDto {
  @ApiPropertyOptional()
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsAlphanumeric()
  @MaxLength(50)
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional()
  @IsAlphanumeric()
  @MaxLength(50)
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  heightInCm?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  weightInKg?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ssn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  proDoctorNumber?: string;
}
