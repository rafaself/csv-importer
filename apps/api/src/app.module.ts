import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseOptions } from '@csv/database';
import { AppController } from './app.controller.js';
import { ImportModule } from './apps/imports/import.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StorageModule } from '@nestjs/storage';
import { createStorageOptions } from './apps/storage/storage.config.js';
import { MulterModule } from '@nestjs/platform-express';
import { MAX_FILE_SIZE } from './apps/storage/storage.rules.js';
import { apiConfig, databaseConfig, storageConfig } from './app.config.js';

@Module({
  imports: [
    ImportModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, databaseConfig, storageConfig],
      envFilePath: '../../../.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        getDatabaseOptions(config.getOrThrow('databaseConfig')),
    }),

    StorageModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        createStorageOptions(config.getOrThrow('storage')),
    }),
    MulterModule.register({
      limits: { fileSize: MAX_FILE_SIZE, files: 1 },
    }), // Intentional,
  ],
  controllers: [AppController],
})
export class AppModule {}
