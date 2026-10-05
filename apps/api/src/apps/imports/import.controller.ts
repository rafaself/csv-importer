import { Controller, Get, Post } from '@nestjs/common';
import { ImportService } from './import.service.js';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  importData() {
    this.importService.uploadFile();

    return {
      status: 'ok',
    };
  }
}
