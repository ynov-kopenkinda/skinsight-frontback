import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const { env } = await import('@kopenkinda/env');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Internal')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.STEAM_BOT_PORT);
}
bootstrap();
