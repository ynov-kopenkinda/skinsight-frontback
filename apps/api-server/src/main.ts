import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs/promises';

async function bootstrap() {
  const { env } = await import('@skinsight/env');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Internal')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      name: 'Authorization',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  await fs.writeFile('./swagger.json', JSON.stringify(document));

  SwaggerModule.setup('api', app, document);

  await app.listen(env.API_SERVER_PORT);
}
bootstrap();
