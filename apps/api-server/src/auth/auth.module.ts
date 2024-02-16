//src/auth/auth.module.ts
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export const jwtSecret = "zjP9h6ZI5LoSKCRj";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: "5m" }, // e.g. 30s, 7d, 24h
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
