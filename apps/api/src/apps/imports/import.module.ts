import { Module } from '@nestjs/common';
import { ImportService } from './import.service.js';
import { ImportController } from './import.controller.js';
import { Import, ImportRepository } from '@csv/database';
import { DataSource, TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ImportService],
  imports: [TypeOrmModule.forFeature([Import])],
  controllers: [ImportController],
})
export class ImportModule {}
