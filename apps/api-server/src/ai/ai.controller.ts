import { Controller } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ApiTags } from "@nestjs/swagger";
import { AppointmentService } from "src/appointment/appointment.service";
import { ChatEventService } from "src/chat-event/chat-event.service";
import { AI_USER_ID } from "src/constants";
import { S3Service } from "src/s3/s3.service";

import { ChatEventType } from "@skinsight/database";

import { AiService } from "./ai.service";
import { PreAppointmentCreatedEvent } from "./new-preappointment.event";

@Controller("ai")
@ApiTags("AI")
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly s3: S3Service,
    private readonly chatEventService: ChatEventService,
    private readonly appointmentService: AppointmentService,
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
      const exists = await this.appointmentService.checkIfAppointmentExist(
        event.userId,
        event.doctorId,
      );
      if (!exists) {
        await this.chatEventService.create({
          chatId: event.chatId,
          chatEventType: ChatEventType.APPOINTMENT_INVITE_SENT,
          userId: AI_USER_ID,
          data: JSON.stringify({
            text: "Do you want me to book an appointment for you?",
            doctorID: event.doctorId,
          }),
        });
      } else {
        await this.chatEventService.create({
          chatId: event.chatId,
          chatEventType: ChatEventType.APPOINTMENT_INVITE_SENT,
          userId: AI_USER_ID,
          data: JSON.stringify({
            text: "You already have an appointment with this doctor.",
            doctorID: event.doctorId,
          }),
        });
      }
    }
  }
}
