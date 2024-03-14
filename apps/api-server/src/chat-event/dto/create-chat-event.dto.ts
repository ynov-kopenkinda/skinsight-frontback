import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

import { ChatEventType } from "@skinsight/database";

export class CreateChatEventDto {
  @ApiProperty()
  @IsNumber()
  chatId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  data: string;

  @ApiProperty()
  @IsEnum(ChatEventType)
  chatEventType: ChatEventType;
}
