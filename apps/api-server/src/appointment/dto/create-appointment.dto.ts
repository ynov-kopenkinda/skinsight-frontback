import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNumber()
  patientId: number;

  @ApiProperty()
  @IsNumber()
  doctorId: number;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  date: Date;
}
