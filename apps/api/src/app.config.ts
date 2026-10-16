import { loadApiConfig, loadStorageConfig, StorageConfig } from '@csv/config';
import { getDatabaseOptions } from '@csv/database';
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
  config: ConfigService<{ storage: StorageConfig }>,
): StorageModuleOptions => {
  return createStorageOptions(config.getOrThrow('storage'));
};
