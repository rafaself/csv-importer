import { loadApiConfig, loadStorageConfig } from '@csv/config';
import { getDatabaseOptions } from '@csv/database';
import { StorageConfig } from '@csv/shared';
import { createStorageOptions } from '@csv/storage';
import { ConfigService, registerAs } from '@nestjs/config';
import { type StorageModuleOptions } from '@nestjs/storage';

export const apiConfig = registerAs('api', () => loadApiConfig(process.env));

export const databaseConfig = registerAs('database', () =>
  getDatabaseOptions(process.env),
);

export const storageConfig = registerAs('storage', () =>
  loadStorageConfig(process.env),
);

export const buildStorageOptions = (
  storageConfig: StorageConfig,
): StorageModuleOptions => {
  return createStorageOptions(storageConfig);
};
