import 'reflect-metadata';
import { readAppConfig } from '@csv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const { apiPort } = readAppConfig();
  const app = await NestFactory.create(AppModule);
  await app.listen(apiPort);
}
await bootstrap();
