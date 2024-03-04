import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { Chat } from "./entity/chat.entity";

@ApiTags("Chat")
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOkResponse({ type: Chat })
  @ApiOperation({ summary: "Get a chat depending on passed id" })
  @Get(":id")
  async getChat(@Param("id", ParseIntPipe) id: number) {
    return this.chatService.getChatById(id);
  }

  @ApiOkResponse({ type: Chat })
  @ApiOperation({ summary: "Create a chat depending on passed id" })
  @Post()
  async createChat(@Body() body: CreateChatDto) {
    return this.chatService.createChat(body);
  }

  @ApiResponse({ type: [Chat] })
  @ApiOperation({ summary: "Get chat(s) where an user appear" })
  @Get("/user/:id")
  async getChatByUserId(@Param("id", ParseIntPipe) id: number) {
    return this.chatService.getChatByUserId(id);
  }

  @ApiOkResponse({ type: Chat })
  @ApiOperation({ summary: "Delete a chat depending on passed id" })
  @Delete(":id")
  async deleteChat(@Param("id", ParseIntPipe) id: number) {
    return this.chatService.deleteChat(id);
  }
}
