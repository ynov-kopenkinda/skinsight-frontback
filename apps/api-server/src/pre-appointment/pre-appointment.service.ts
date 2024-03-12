import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PreAppointmentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPreAppointmentDto) {
    return this.prisma.preAppointment.create({
      data: { ...createPreAppointmentDto },
    });
  }

  async findByPatientId(id: number) {
    return this.prisma.preAppointment.findMany({ where: { patientId: id } });
  }

  async findByDoctorId(id: number) {
    return this.prisma.preAppointment.findMany({ where: { doctorId: id } });
  }
}
