import {
  loadApiConfig,
  loadDatabaseConfig,
  loadStorageConfig,
} from '@csv/config';
import { createDatabaseOptions } from '@csv/database';
import { StorageConfig } from '@csv/shared';
import { createStorageOptions } from '@csv/storage';
import { registerAs } from '@nestjs/config';
import { type StorageModuleOptions } from '@nestjs/storage';

export const apiConfig = registerAs('api', () => loadApiConfig(process.env));

export const databaseConfig = registerAs('database', () =>
  loadDatabaseConfig(process.env),
);

export const buildDatabaseOptions = (databaseUrl: string) => {
  return createDatabaseOptions(databaseUrl);
};

export const storageConfig = registerAs('storage', () =>
  loadStorageConfig(process.env),
);

export const buildStorageOptions = (
  storageConfig: StorageConfig,
): StorageModuleOptions => {
  return createStorageOptions(storageConfig);
};
