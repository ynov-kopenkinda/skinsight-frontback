import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { ChatEventController } from "./chat-event.controller";
import { ChatEventService } from "./chat-event.service";

@Module({
  providers: [ChatEventService, PrismaService],
  controllers: [ChatEventController],
})
export class ChatEventModule {}
