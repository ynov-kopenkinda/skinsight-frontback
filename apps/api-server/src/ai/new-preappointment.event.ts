import { Chat, PreAppointment, User } from "@skinsight/database";

export class PreAppointmentCreatedEvent {
  constructor(
    readonly preAppointment: PreAppointment,
    readonly chatId: Chat["id"],
    readonly userId: User["id"],
  ) {}
}
