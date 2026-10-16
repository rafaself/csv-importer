import { loadStorageConfig } from '@csv/config';
import { StorageConfig } from '@csv/shared';
import { createStorageOptions } from '@csv/storage';
import { registerAs } from '@nestjs/config';
import { type StorageModuleOptions } from '@nestjs/storage';

export const storageConfig = registerAs('storage', () =>
  loadStorageConfig(process.env),
);

export const buildStorageOptions = (
  storageConfig: StorageConfig,
): StorageModuleOptions => {
  return createStorageOptions(storageConfig);
};
