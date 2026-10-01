import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseOptions } from '@csv/database';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => getDatabaseOptions(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
