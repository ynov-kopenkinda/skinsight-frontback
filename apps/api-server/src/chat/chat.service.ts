import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateChatDto } from "./dto/create-chat.dto";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(dto: CreateChatDto) {
    return this.prisma.chat.create({
      data: { ...dto },
    });
  }

  async getChatById(id: number) {
    return this.prisma.chat.findUnique({
      where: { id },
    });
  }

  async deleteChat(id: number) {
    return this.prisma.chat.delete({
      where: { id },
    });
  }

  async getChatByUserId(id: number) {
    return this.prisma.chat.findMany({
      where: {
        OR: [
          {
            invitorId: id,
          },
          {
            inviteeId: id,
          },
        ],
      },
    });
  }
}
