import fs from "fs/promises";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { PrismaClient } from "@skinsight/database";

import { AppModule } from "./app.module";

const prisma = new PrismaClient();

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "access-token",
    )
    .setTitle("Web-Services API")
    .setDescription("API du cours de web-services")
    .setVersion("0.1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);
  return document;
}

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const document = setupSwagger(app);
  await fs.writeFile("./swagger.json", JSON.stringify(document));
  await app.listen(3001);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
