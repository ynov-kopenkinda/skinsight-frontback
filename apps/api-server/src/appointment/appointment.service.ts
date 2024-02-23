import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateAppointmentDto } from "./dto/create-appointment.dto";

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: { ...createAppointmentDto },
    });
  }

  async findOne(id: number) {
    return this.prisma.appointment.findUnique({ where: { id } });
  }

  findAllForOneUser(req) {
    const userData = req.user;
    if (userData.role === "DOCTOR") {
      const doctorId = userData.id;
      return this.prisma.appointment.findMany({ where: { doctorId } });
    } else if (userData.role === "PATIENT") {
      const patientId = userData.id;
      return this.prisma.appointment.findMany({ where: { patientId } });
    }
  }

  async acceptAppointment(req, appointmentId: number) {
    const id = appointmentId;
    const alreadyExistingData = await this.findOne(appointmentId);
    const user = req.user;

    if (user.role === "DOCTOR" && user.id === alreadyExistingData.doctorId) {
      console.log("passing 1st condition");
      await this.prisma.appointment.update({
        data: {
          isAcceptedByDoctor: { set: true },
        },
        where: { id },
      });
      return "Doctor acceptance updated";
    } else if (
      user.role === "PATIENT" &&
      user.id === alreadyExistingData.patientId
    ) {
      await this.prisma.appointment.update({
        data: {
          isAcceptedByPatient: { set: true },
        },
        where: { id },
      });
      return "Patient acceptance updated";
    } else {
      throw UnauthorizedException;
    }
  }

  async declineAppointment(req, appointmentId: number) {
    const id = appointmentId;
    const alreadyExistingData = await this.findOne(appointmentId);
    const user = req.user;

    if (user.role === "DOCTOR" && user.id === alreadyExistingData.doctorId) {
      await this.prisma.appointment.update({
        data: {
          isAcceptedByDoctor: { set: false },
        },
        where: { id },
      });
      return "Doctor acceptance updated";
    } else if (
      user.role === "PATIENT" &&
      user.id === alreadyExistingData.patientId
    ) {
      await this.prisma.appointment.update({
        data: {
          isAcceptedByPatient: { set: false },
        },
        where: { id },
      });
      return "Patient acceptance updated";
    } else {
      throw UnauthorizedException;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
