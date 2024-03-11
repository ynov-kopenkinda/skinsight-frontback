import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

import { $Enums, ChatEvent } from "@skinsight/database";

export class ChatEventDto implements ChatEvent {
  @ApiProperty()
  id: number;
  @ApiProperty()
  chatId: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  data: string;
  @ApiProperty()
  chatEventType: $Enums.ChatEventType;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ChatDto {
  @ApiProperty()
  @IsNumber()
  invitorId: number;

  @ApiProperty()
  @IsNumber()
  inviteeId: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ type: [ChatEventDto] })
  ChatEvent: ChatEventDto[];
}
