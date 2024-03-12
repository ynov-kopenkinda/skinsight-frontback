import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";

import { PreAppointmentController } from "./pre-appointment.controller";
import { PreAppointmentService } from "./pre-appointment.service";

@Module({
  imports: [PrismaModule],
  controllers: [PreAppointmentController],
  providers: [PreAppointmentService],
  exports: [PreAppointmentService],
})
export class PreAppointmentModule {}
