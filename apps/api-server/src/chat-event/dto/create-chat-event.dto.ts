import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

export enum ChatEventType {
  CHAT_CREATED,
  MESSAGE_SENT,
  IMAGE_SENT,
  FILE_SENT,
  APPOINTMENT_INVITE_SENT,
  APPOINTMENT_INVITE_ACCEPTED,
  APPOINTMENT_INVITE_DECLINED,
}
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
