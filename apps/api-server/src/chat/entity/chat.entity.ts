import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ChatDto {
  @ApiProperty()
  @IsNumber()
  invitorId: number;

  @ApiProperty()
  @IsNumber()
  inviteeId: number;
}
