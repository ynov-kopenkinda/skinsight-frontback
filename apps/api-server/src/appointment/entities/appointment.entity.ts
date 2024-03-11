import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Appointment as IAppointment } from "@skinsight/database";

export class Appointment implements IAppointment {
  @ApiProperty()
  id: number;
  @ApiProperty()
  doctorId: number;
  @ApiProperty()
  patientId: number;
  @ApiProperty()
  isAcceptedByDoctor: boolean;
  @ApiProperty()
  isAcceptedByPatient: boolean;
  @ApiProperty()
  location: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiPropertyOptional()
  doctor_name?: string;
  @ApiPropertyOptional()
  patient_name?: string;
}
