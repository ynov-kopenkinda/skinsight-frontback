import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthMiddleware } from "./auth.middleware";
import { AuthModule } from "./auth/auth.module";
import { ChatEventController } from "./chat-event/chat-event.controller";
import { ChatEventModule } from "./chat-event/chat-event.module";
import { ChatEventService } from "./chat-event/chat-event.service";
import { ChatController } from "./chat/chat.controller";
import { ChatModule } from "./chat/chat.module";
import { ChatService } from "./chat/chat.service";
import { PrismaService } from "./prisma/prisma.service";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { UserService } from "./users/users.service";

@Module({
  imports: [UsersModule, ChatModule, ChatEventModule, AuthModule],
  controllers: [
    AppController,
    UsersController,
    ChatEventController,
    ChatController,
  ],
  providers: [
    AppService,
    UserService,
    ChatService,
    ChatEventService,
    PrismaService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
