import { Injectable } from "@nestjs/common";

import { ChatEventType } from "@skinsight/database";

import { PrismaService } from "../prisma/prisma.service";
import { CreateChatDto } from "./dto/create-chat.dto";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(dto: CreateChatDto) {
    const chat = await this.prisma.chat.findFirst({
      where: {
        OR: [
          { AND: [{ invitorId: dto.invitorId }, { inviteeId: dto.inviteeId }] },
          { AND: [{ invitorId: dto.inviteeId }, { inviteeId: dto.invitorId }] },
        ],
      },
    });

    if (!chat) {
      return this.prisma.chat.create({
        data: { ...dto },
      });
    }
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
    const data = await this.prisma.chat.findMany({
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
      include: {
        ChatEvent: {
          where: {
            chatEventType: ChatEventType.MESSAGE_SENT,
          },
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            Users: {
              select: {
                id: true,
                firstName: true,
              },
            },
          },
        },
      },
    });

    const result = data.map(async (chat) => {
      const otherUserId =
        chat.invitorId === id ? chat.inviteeId : chat.invitorId;
      const firstName = await this.getUserNameById(otherUserId);

      return {
        id: chat.id,
        invitorId: chat.invitorId,
        inviteeId: chat.inviteeId,
        lastMessage: chat.ChatEvent[0]?.data,
        lastMessageDate: chat.ChatEvent[0]?.createdAt,
        firstname: firstName,
      };
    });

    return Promise.all(result);
  }

  async getUserNameById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { firstName: true },
    });

    return user.firstName;
  }
}
