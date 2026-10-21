import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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
  constructor(private readonly service: ImportService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: uploadToDisk({
        disk: 'private',
        contentTypes: FILE_TYPES,
        detectContentType: detectCsvContentType,
      }),
      limits: { fileSize: MAX_FILE_SIZE, files: 1 },
    }),
  )
  async importData(@UploadedFile() file: StoredUpload | undefined) {
    if (!file) {
      throw new BadRequestException('File must be provided.');
    }

    try {
      await this.service.save({
        originalFileName: file.originalname,
        storageKey: file.key,
      });
      return file;
    } catch (err) {
      await this.service.deleteFile(file.key, file.disk!);
      throw err;
    }
  }
}
