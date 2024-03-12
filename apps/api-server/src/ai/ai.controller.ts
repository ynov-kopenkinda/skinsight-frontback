import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AiService } from "./ai.service";
import { CreateAiDto } from "./dto/create-ai.dto";

@Controller("ai")
@ApiTags("AI")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  sendMessage(@Body() dto: CreateAiDto) {
    return this.aiService.askIfAppointmentNeeded(dto.image_url);
  }
}
