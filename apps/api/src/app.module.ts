import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { ImportModule } from './apps/imports/import.module.js';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import {
  apiConfig,
  buildDatabaseOptions,
  buildStorageOptions,
  databaseConfig,
  storageConfig,
} from './app.config.js';
import { StorageModule } from '@nestjs/storage';

@Module({
  controllers: [AppController],
  imports: [
    ImportModule,

    ConfigModule.forRoot({
      cache: true,
      envFilePath: '../../../.env',
      isGlobal: true,
      load: [apiConfig, databaseConfig, storageConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: buildDatabaseOptions,
    }),

    StorageModule.forRootAsync({
      inject: [storageConfig.KEY],
      useFactory: buildStorageOptions,
    }),
  ],
})
export class AppModule {}
