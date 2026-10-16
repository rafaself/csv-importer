import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { ImportModule } from './apps/imports/import.module.js';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { apiConfig, databaseConfig, storageConfig } from './app.config.js';
import { StorageModule } from '@nestjs/storage';
import { createStorageOptions } from '@csv/storage';

@Module({
  imports: [
    ImportModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, databaseConfig, storageConfig],
      envFilePath: '../../../.env',
      cache: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (options: ConfigType<typeof databaseConfig>) => options,
    }),

    StorageModule.forRootAsync({
      inject: [ConfigService],
      useFactory: createStorageOptions,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
