import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth.middleware';
import { UsersModule } from './users/users.module';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { ChatEventModule } from './chat-event/chat-event.module';
import { ChatEventController } from './chat-event/chat-event.controller';
import { ChatEventService } from './chat-event/chat-event.service';

@Module({
  imports: [UsersModule, ChatModule, ChatEventModule],
  controllers: [AppController, ChatController, ChatEventController],
  providers: [AppService, ChatService, ChatEventService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
