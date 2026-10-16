import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { ImportModule } from './apps/imports/import.module.js';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import {
  apiConfig,
  buildStorageOptions,
  databaseConfig,
  storageConfig,
} from './app.config.js';
import { StorageModule } from '@nestjs/storage';

@Module({
  imports: [
    ImportModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, databaseConfig, storageConfig],
      envFilePath: '../../../.env',
      cache: true,
    }),

    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),

    StorageModule.forRootAsync({
      inject: [storageConfig.KEY],
      useFactory: buildStorageOptions,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
