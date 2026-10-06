import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseOptions } from '@csv/database';
import { AppController } from './app.controller.js';
import { ImportModule } from './apps/imports/import.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StorageModule } from '@nestjs/storage';
import { createStorageOptions } from './apps/storage/storage.config.js';
import { apiConfig } from './app.config.js';
import { MulterModule } from '@nestjs/platform-express';
import { MAX_FILE_SIZE } from './apps/storage/storage.rules.js';

@Module({
  imports: [
    // App modules
    ImportModule,

    // Utils modules
    ConfigModule.forRoot({ isGlobal: true, load: [apiConfig] }),
    TypeOrmModule.forRootAsync({
      useFactory: () => getDatabaseOptions(),
    }),

    // Storage related modules
    StorageModule.forRootAsync({
      inject: [ConfigService],
      useFactory: createStorageOptions,
    }),
    MulterModule.register({
      limits: { fileSize: MAX_FILE_SIZE, files: 1 },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
