import { ApiProperty } from "@nestjs/swagger";

import { PreAppointment as IPreAppointment } from "@skinsight/database";

export class PreAppointment implements IPreAppointment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  doctorId: number;

  @ApiProperty()
  patientId: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  createdAt: Date;
}
