import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseOptions } from '@csv/database';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ImportModule } from './apps/imports/import.module.js';

@Module({
  imports: [
    ImportModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => getDatabaseOptions(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
