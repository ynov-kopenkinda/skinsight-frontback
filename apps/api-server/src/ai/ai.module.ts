import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";

@Module({
  controllers: [AiController],
  providers: [AiService],
  imports: [HttpModule],
})
export class AiModule {}
