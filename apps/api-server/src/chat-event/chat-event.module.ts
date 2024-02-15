import { Module } from '@nestjs/common';
import { ChatEventService } from './chat-event.service';
import { ChatEventController } from './chat-event.controller';

@Module({
  providers: [ChatEventService],
  controllers: [ChatEventController]
})
export class ChatEventModule {}
