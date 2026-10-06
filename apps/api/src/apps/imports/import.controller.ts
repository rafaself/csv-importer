import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImportService } from './import.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  InjectDisk,
  StorageDisk,
  StoredUpload,
  uploadToDisk,
} from '@nestjs/storage';
import { FILE_CACHE_CONTROL, FILE_TYPES } from '../storage/storage.rules.js';

@Controller('import')
export class ImportController {
  constructor(
    private readonly importService: ImportService,
    @InjectDisk('public') private readonly publicFiles: StorageDisk,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: uploadToDisk({
        disk: 'public',
        contentTypes: FILE_TYPES,
        cacheControl: FILE_CACHE_CONTROL,
      }),
    }),
  )
  importData(@UploadedFile() file: StoredUpload | undefined) {
    if (!file) {
      throw new BadRequestException('File is required.');
    }

    console.log(file);

    this.importService.uploadFile();

    return {
      status: 'ok',
    };
  }
}
