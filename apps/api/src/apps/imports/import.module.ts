import { Module } from '@nestjs/common';
import { ImportService } from './import.service.js';
import { ImportController } from './import.controller.js';

@Module({
  providers: [ImportService],
  controllers: [ImportController],
})
export class ImportModule {}
