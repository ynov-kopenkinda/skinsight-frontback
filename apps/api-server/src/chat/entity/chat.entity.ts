import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class Chat {
  @ApiProperty()
  @IsNumber()
  invitorId: number;

  @ApiProperty()
  @IsNumber()
  inviteeId: number;
}
