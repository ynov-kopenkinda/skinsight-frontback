import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateChatDto {
  @ApiProperty()
  @IsNumber()
  invitorId: number;

  @ApiProperty()
  @IsNumber()
  inviteeId: number;
}
