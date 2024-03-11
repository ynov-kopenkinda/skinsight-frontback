import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { ChatEventService } from "./chat-event.service";
import { CreateChatEventDto } from "./dto/create-chat-event.dto";

@ApiTags("ChatEvent")
@Controller("chat-event")
export class ChatEventController {
  constructor(private readonly chatEventService: ChatEventService) {}

  @Get(":chatId")
  async getChatEventsFromChatId(@Param("chatId", ParseIntPipe) chatId: number) {
    return this.chatEventService.findManyFromIdChat(chatId);
  }

  @ApiOperation({ summary: "Get a chat-event depending on passed chat id" })
  @Post(":chatId")
  async createChatEvent(@Body() data: CreateChatEventDto) {
    return this.chatEventService.create(data);
  }
}
