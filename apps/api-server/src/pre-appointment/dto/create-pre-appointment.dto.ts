import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePreAppointmentDto {
  @ApiProperty()
  @IsNumber()
  doctorId: number;

  @ApiProperty()
  @IsNumber()
  patientId: number;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  image: string;
}
