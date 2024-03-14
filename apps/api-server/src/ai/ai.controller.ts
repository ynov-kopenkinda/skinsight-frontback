import { Controller } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ApiTags } from "@nestjs/swagger";
import { ChatEventService } from "src/chat-event/chat-event.service";
import { ChatEventType } from "src/chat-event/dto/create-chat-event.dto";
import { AI_USER_ID } from "src/constants";
import { S3Service } from "src/s3/s3.service";

import { AiService } from "./ai.service";
import { PreAppointmentCreatedEvent } from "./new-preappointment.event";

@Controller("ai")
@ApiTags("AI")
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly s3: S3Service,
    private readonly chatEventService: ChatEventService,
  ) {}

  @OnEvent("preappointment.new")
  async handlePreAppointmentCreatedEvent(event: PreAppointmentCreatedEvent) {
    const url = await this.s3.getSignedGetUrl(event.preAppointment.image);
    const isNeeded = await this.aiService.askIfAppointmentNeeded(url);
    await this.chatEventService.create({
      chatId: event.chatId,
      chatEventType: ChatEventType.MESSAGE_SENT,
      userId: AI_USER_ID,
      data: `I have analyzed your image and I think: "${isNeeded}"`,
    });
    if (
      isNeeded !==
      "It seems that you don't have risks, but to be sure, you can still see a doctor"
    ) {
      await this.chatEventService.create({
        chatId: event.chatId,
        chatEventType: ChatEventType.MESSAGE_SENT,
        userId: AI_USER_ID,
        data: "Do you want me to book an appointment for you?",
      });
    }
  }
}
