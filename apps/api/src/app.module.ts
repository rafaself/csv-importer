import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseOptions } from '@csv/database';
import { AppController } from './app.controller.js';
import { ImportModule } from './apps/imports/import.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StorageModule } from '@nestjs/storage';
import { createStorageOptions } from './apps/storage/storage.config.js';
import { apiConfig } from './app.config.js';

@Module({
  imports: [
    ImportModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => getDatabaseOptions(),
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [apiConfig] }),
    StorageModule.forRootAsync({
      inject: [ConfigService],
      useFactory: createStorageOptions,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
