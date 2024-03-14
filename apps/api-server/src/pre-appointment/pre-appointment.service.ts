import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PreAppointmentCreatedEvent } from "src/ai/new-preappointment.event";
import { AI_USER_ID } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";

import { CreatePreAppointmentDto } from "./dto/create-pre-appointment.dto";

@Injectable()
export class PreAppointmentService {
  constructor(
    private readonly prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(createPreAppointmentDto: CreatePreAppointmentDto) {
    let chat = await this.prisma.chat.findFirst({
      where: {
        OR: [
          {
            AND: [
              { invitorId: createPreAppointmentDto.patientId },
              { inviteeId: AI_USER_ID },
            ],
          },
          {
            AND: [
              { invitorId: AI_USER_ID },
              { inviteeId: createPreAppointmentDto.patientId },
            ],
          },
        ],
      },
    });

    if (!chat) {
      chat = await this.prisma.chat.create({
        data: {
          inviteeId: createPreAppointmentDto.patientId,
          invitorId: AI_USER_ID,
        },
      });
    }

    await this.prisma.chatEvent.create({
      data: {
        chatId: chat.id,
        chatEventType: "MESSAGE_SENT",
        userId: createPreAppointmentDto.patientId,
        data: createPreAppointmentDto.message,
      },
    });

    await this.prisma.chatEvent.create({
      data: {
        chatId: chat.id,
        chatEventType: "IMAGE_SENT",
        userId: createPreAppointmentDto.patientId,
        data: createPreAppointmentDto.image,
      },
    });

    await this.prisma.chatEvent.create({
      data: {
        chatId: chat.id,
        chatEventType: "MESSAGE_SENT",
        userId: 1,
        data: "Your picture is gonna be analyzed, please be patient.",
      },
    });

    const preappointment = await this.prisma.preAppointment.create({
      data: {
        ...createPreAppointmentDto,
      },
    });

    this.eventEmitter.emit(
      "preappointment.new",
      new PreAppointmentCreatedEvent(
        preappointment,
        chat.id,
        createPreAppointmentDto.patientId,
      ),
    );

    return preappointment;
  }

  async findByPatientId(id: number) {
    return this.prisma.preAppointment.findMany({ where: { patientId: id } });
  }

  async findByDoctorId(id: number) {
    return this.prisma.preAppointment.findMany({ where: { doctorId: id } });
  }
}
