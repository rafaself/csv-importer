import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { apiConfig } from './app.config.js';

async function bootstrap() {
  const { apiPort } = apiConfig();
  const app = await NestFactory.create(AppModule);
  await app.listen(apiPort);
}
await bootstrap();
