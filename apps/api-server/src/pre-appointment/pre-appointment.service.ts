import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreatePreAppointmentDto } from "./dto/create-pre-appointment.dto";

@Injectable()
export class PreAppointmentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPreAppointmentDto: CreatePreAppointmentDto) {
    console.log(createPreAppointmentDto);

    let chat = await this.prisma.chat.findFirst({
      where: {
        OR: [
          {
            AND: [
              { invitorId: createPreAppointmentDto.patientId },
              { inviteeId: 1 },
            ],
          },
          {
            AND: [
              { invitorId: 1 },
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
          invitorId: 1,
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

    const chatEvent = await this.prisma.chatEvent.create({
      data: {
        chatId: chat.id,
        chatEventType: "MESSAGE_SENT",
        userId: 1,
        data: "You're picture is gonna be analyzed, please be patient.",
      },
    });

    return this.prisma.preAppointment.create({
      data: {
        ...createPreAppointmentDto,
      },
    });
  }

  async findByPatientId(id: number) {
    return this.prisma.preAppointment.findMany({ where: { patientId: id } });
  }

  async findByDoctorId(id: number) {
    return this.prisma.preAppointment.findMany({ where: { doctorId: id } });
  }
}
