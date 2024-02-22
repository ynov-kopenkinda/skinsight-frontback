import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";

import { UsersController } from "./users.controller";
import { UserService } from "./users.service";

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
