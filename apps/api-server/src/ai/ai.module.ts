import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AppointmentService } from "src/appointment/appointment.service";
import { ChatEventService } from "src/chat-event/chat-event.service";
import { PrismaService } from "src/prisma/prisma.service";
import { S3Service } from "src/s3/s3.service";

import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    S3Service,
    ChatEventService,
    PrismaService,
    AppointmentService,
  ],
  imports: [HttpModule],
})
export class AiModule {}
