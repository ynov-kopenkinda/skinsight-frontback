import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { Appointment } from "@skinsight/database";

import { CreateAppointmentDto } from "./dto/create-appointment.dto";

export type AppointmentWithDoctor = Appointment & { doctor_name: string };
export type AppointmentWithPatient = Appointment & { patient_name: string };

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: { ...createAppointmentDto, isAcceptedByPatient: true },
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

  async findAllForPatient(id: number) {
    const appointments = await this.prisma.appointment.findMany({
      where: { patientId: id },
    });

    const appointmentsWithDoctor: AppointmentWithDoctor[] = [];

    for (const appointment of appointments) {
      const doctor = await this.prisma.user.findUnique({
        where: { id: appointment.doctorId },
      });
      appointmentsWithDoctor.push({
        ...appointment,
        doctor_name: doctor.lastName,
      });
    }

    return appointmentsWithDoctor;
  }

  async findAllForDoctor(id: number) {
    const appointments = await this.prisma.appointment.findMany({
      where: { doctorId: id },
    });

    const appointmentsWithDoctor: AppointmentWithPatient[] = [];

    for (const appointment of appointments) {
      const patient = await this.prisma.user.findUnique({
        where: { id: appointment.patientId },
      });
      appointmentsWithDoctor.push({
        ...appointment,
        patient_name: patient.lastName,
      });
    }

    return appointmentsWithDoctor;
  }

  async acceptAppointment(userId: number, appointmentId: number) {
    const alreadyExistingData = await this.findOne(appointmentId);
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (
      user.userRole === "DOCTOR" &&
      user.id === alreadyExistingData.doctorId
    ) {
      console.log("passing 1st condition");
      await this.prisma.appointment.update({
        data: {
          isAcceptedByDoctor: { set: true },
        },
        where: { id: appointmentId },
      });
      return "Doctor acceptance updated";
    } else if (
      user.userRole === "PATIENT" &&
      user.id === alreadyExistingData.patientId
    ) {
      await this.prisma.appointment.update({
        data: {
          isAcceptedByPatient: { set: true },
        },
        where: { id: appointmentId },
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

  async checkIfAppointmentExist(patientId: number, doctorId: number) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { patientId, doctorId },
    });

    return appointment;
  }
}
