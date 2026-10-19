import { CreateImportDto } from '@csv/contracts';
import { Import, ImportRepository } from '@csv/database';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { storageConfig } from '../../configs/storage.config.js';
import type { StorageConfig } from '@csv/config';
import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(Import)
    private readonly repository: Repository<Import>,
    @Inject(storageConfig.KEY)
    private readonly storageConfig: StorageConfig,
  ) {}

  isLocalStorage(
    storage: StorageConfig,
  ): storage is Extract<StorageConfig, { driver: 'local' }> {
    return storage.driver === 'local';
  }

  async deleteFile(fileName: string) {
    if (this.isLocalStorage(this.storageConfig)) {
      const root = this.storageConfig.objectStorage.root;
      const filePath = resolve(root, fileName);
      await unlink(filePath);
    }
  }

  async save(data: CreateImportDto) {
    await this.repository.save(data);
  }
}
