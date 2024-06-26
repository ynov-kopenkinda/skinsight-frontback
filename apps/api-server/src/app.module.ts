import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { JwtModule, JwtService } from "@nestjs/jwt";

import { AiModule } from "./ai/ai.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppointmentModule } from "./appointment/appointment.module";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { ChatEventController } from "./chat-event/chat-event.controller";
import { ChatEventModule } from "./chat-event/chat-event.module";
import { ChatEventService } from "./chat-event/chat-event.service";
import { ChatController } from "./chat/chat.controller";
import { ChatModule } from "./chat/chat.module";
import { ChatService } from "./chat/chat.service";
import { AppLoggerMiddleware } from "./logger.middleware";
import { MessagesModule } from "./messages/messages.module";
import { PreAppointmentModule } from "./pre-appointment/pre-appointment.module";
import { PrismaService } from "./prisma/prisma.service";
import { S3Module } from "./s3/s3.module";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { UserService } from "./users/users.service";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UsersModule,
    ChatModule,
    ChatEventModule,
    AuthModule,
    JwtModule,
    AiModule,
    AppointmentModule,
    PreAppointmentModule,
    MessagesModule,
    S3Module,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    ChatEventController,
    ChatController,
  ],
  providers: [
    AppService,
    AuthService,
    UserService,
    ChatService,
    ChatEventService,
    PrismaService,
    JwtService,
  ],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
