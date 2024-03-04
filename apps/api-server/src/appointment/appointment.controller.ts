import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "src/auth/decorators/user.decorator";
import { AccessTokenGuard } from "src/guards/access-token.guard";

import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";

@ApiTags("Appointments")
@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get("/:id")
  findOneAppointment(@Param("id", ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Get("/user")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("acces-token")
  @ApiOperation({ summary: "Get all appointment for the user logged" })
  findAllForOneUser(@Request() request) {
    return this.appointmentService.findAllForOneUser(request);
  }

  @Patch("/accept/:appointmentId")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("acces-token")
  acceptAppointment(
    @Request() request,
    @Param("appointmentId", ParseIntPipe) appointmentId: number,
  ) {
    return this.appointmentService.acceptAppointment(request, appointmentId);
  }

  @Patch("/decline/:appointmentId")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("acces-token")
  declineAppointment(
    @Request() request,
    @Param("appointmentId", ParseIntPipe) appointmentId: number,
  ) {
    return this.appointmentService.declineAppointment(request, appointmentId);
  }
}
