import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateChatEventDto } from "./dto/create-chat-event.dto";

@Injectable()
export class ChatEventService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateChatEventDto) {
    return this.prisma.chatEvent.create({
      data: { ...dto, chatEventType: dto.chatEventType ?? "MESSAGE_SENT" },
    });
  }

  async findManyFromIdChat(chatId: number) {
    return this.prisma.chatEvent.findMany({ where: { chatId: chatId } });
  }

  async findOne(id: number) {
    return this.prisma.chatEvent.findUnique({ where: { id } });
  }

  async findImageFromUserId(userId: number) {
    return this.prisma.chatEvent.findMany({
      where: { userId: userId, chatEventType: "IMAGE_SENT" },
    });
  }
}
