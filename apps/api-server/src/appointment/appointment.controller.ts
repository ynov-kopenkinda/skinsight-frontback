import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { Appointment } from "./entities/appointment.entity";

@ApiTags("Appointments")
@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get("/:id")
  @ApiResponse({ status: 200, type: Appointment })
  findOneAppointment(@Param("id", ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }
  @Get("/doctor/:id")
  @ApiResponse({ status: 200, type: [Appointment] })
  findAllForDoctor(@Param("id", ParseIntPipe) id: number) {
    return this.appointmentService.findAllForDoctor(id);
  }

  @Get("/patient/:id")
  @ApiResponse({ status: 200, type: [Appointment] })
  findAllForPatient(@Param("id", ParseIntPipe) id: number) {
    return this.appointmentService.findAllForPatient(id);
  }

  @Get("/user")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Get all appointment for the user logged" })
  @ApiResponse({ status: 200, type: [Appointment] })
  findAllForOneUser(@Request() request) {
    return this.appointmentService.findAllForOneUser(request);
  }

  @Patch("/:userId/accept/:appointmentId")
  @ApiResponse({ status: 200, type: String })
  acceptAppointment(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("appointmentId", ParseIntPipe) appointmentId: number,
  ) {
    return this.appointmentService.acceptAppointment(userId, appointmentId);
  }

  @Patch("/:userId/decline/:appointmentId")
  @ApiResponse({ status: 200, type: String })
  declineAppointment(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("appointmentId", ParseIntPipe) appointmentId: number,
  ) {
    return this.appointmentService.declineAppointment(userId, appointmentId);
  }
}
