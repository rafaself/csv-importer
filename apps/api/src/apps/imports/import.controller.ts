import { Controller, Get } from '@nestjs/common';
import { ImportService } from './import.service.js';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get()
  importData() {
    this.importService.uploadFile();
  }
}
