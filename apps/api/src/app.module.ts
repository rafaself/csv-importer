import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseOptions } from '@csv/database';
import { AppController } from './app.controller.js';
import { ImportModule } from './apps/imports/import.module.js';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
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
      load: [apiConfig, storageConfig],
      envFilePath: '../../../.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (options: ConfigType<typeof databaseConfig>) => options,
    }),

    StorageModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        createStorageOptions(config.getOrThrow('storage')),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
