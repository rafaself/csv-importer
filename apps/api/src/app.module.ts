import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { ImportModule } from './apps/imports/import.module.js';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { apiConfig, databaseConfig, storageConfig } from './app.config.js';

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

    // StorageModule.forRootAsync(storageConfig.asProvider()),
  ],
  controllers: [AppController],
})
export class AppModule {}
