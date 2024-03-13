import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreatePreAppointmentDto } from "./dto/create-pre-appointment.dto";
import { PreAppointment } from "./entities/pre-appointment.entity";
import { PreAppointmentService } from "./pre-appointment.service";

@ApiTags("PreAppointments")
@Controller("pre-appointment")
export class PreAppointmentController {
  constructor(private readonly preAppointmentService: PreAppointmentService) {}

  @Post()
  create(@Body() createPreAppointmentDto: CreatePreAppointmentDto) {
    return this.preAppointmentService.create(createPreAppointmentDto);
  }

  @Get("/patient/:id")
  @ApiResponse({ status: 200, type: [PreAppointment] })
  findAllForPatient(@Param("id", ParseIntPipe) id: number) {
    return this.preAppointmentService.findByPatientId(id);
  }
}
