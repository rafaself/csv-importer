import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TextDecoder } from 'node:util';
import { ImportService } from './import.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  type StoredUpload,
  UploadFileInfo,
  uploadToDisk,
} from '@nestjs/storage';
import { FILE_TYPES, MAX_FILE_SIZE } from '@csv/storage';
import { detectCsvContentType } from './import.utils.js';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: uploadToDisk({
        disk: 'private',
        contentTypes: FILE_TYPES,
        detectContentType: detectCsvContentType,
        key: (file: UploadFileInfo) => `${file.originalname}`,
      }),
      limits: { fileSize: MAX_FILE_SIZE, files: 1 },
    }),
  )
  importData(@UploadedFile() file: StoredUpload | undefined) {
    return file;
  }
}
