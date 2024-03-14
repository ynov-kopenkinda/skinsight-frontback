import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ChatEventDto } from "src/chat/entity/chat.entity";

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

  @ApiOkResponse({ type: [ChatEventDto] })
  @Get("/drive/:userId")
  async getImagesFromUserId(@Param("userId", ParseIntPipe) userId: number) {
    return this.chatEventService.findImageFromUserId(userId);
  }

  @ApiOperation({ summary: "Get a chat-event depending on passed chat id" })
  @Post(":chatId")
  async createChatEvent(@Body() data: CreateChatEventDto) {
    return this.chatEventService.create(data);
  }
}
