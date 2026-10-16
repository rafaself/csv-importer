import { loadApiConfig, loadStorageConfig } from '@csv/config';
import { getDatabaseOptions } from '@csv/database';
import { registerAs } from '@nestjs/config';
import { type StorageModuleOptions } from '@nestjs/storage';

export const apiConfig = registerAs('api', () => loadApiConfig(process.env));

export const databaseConfig = registerAs('database', () =>
  getDatabaseOptions(process.env),
);

export const storageConfig = registerAs('storage', () =>
  loadStorageConfig(process.env),
);
