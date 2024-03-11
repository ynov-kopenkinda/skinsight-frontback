import { Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiResponse } from '@nestjs/swagger';
import { chatEntity } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  @ApiResponse({ status: 200, type: chatEntity, isArray: true })
  getChats() {
    return this.chatService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: chatEntity })
  getChatById(id: string) {
    return this.chatService.findOneById(id);
  }
  @Post()
  @ApiResponse({ status: 201, type: chatEntity })
  createChat(data: chatEntity) {
    return this.chatService.createChat(data);
  }

  @Post(':id')
  @ApiResponse({ status: 200, type: chatEntity })
  updateChat(id: string, data: chatEntity) {
    return this.chatService.updateChat(id, data);
  }

  @Post(':id/delete')
  @ApiResponse({ status: 200, type: chatEntity })
  deleteChat(id: string) {
    return this.chatService.deleteChat(id);
  }
}
