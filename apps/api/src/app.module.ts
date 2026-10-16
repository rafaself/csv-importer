import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { ImportModule } from './apps/imports/import.module.js';
import { ConfigModule } from '@nestjs/config';
import { StorageModule } from '@nestjs/storage';
import { apiConfig } from './configs/api.config.js';
import {
  buildDatabaseOptions,
  databaseConfig,
} from './configs/database.config.js';
import {
  buildStorageOptions,
  storageConfig,
} from './configs/storage.config.js';

@Module({
  controllers: [AppController],
  imports: [
    ImportModule,

    ConfigModule.forRoot({
      cache: true,
      envFilePath: '../../../.env',
      expandVariables: true,
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
