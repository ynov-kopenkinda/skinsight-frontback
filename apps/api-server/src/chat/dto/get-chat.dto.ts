import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class GetChatDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNumber()
  invitorId: number;

  @ApiProperty()
  @IsNumber()
  inviteeId: number;

  @ApiProperty()
  @IsString()
  lastMessage: string;

  @ApiProperty()
  @IsString()
  lastMessageDate: Date;
}
