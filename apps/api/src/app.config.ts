import {
  loadApiConfig,
  loadDatabaseConfig,
  loadStorageConfig,
} from '@csv/config';
import { registerAs } from '@nestjs/config';

export const apiConfig = registerAs('api', () => loadApiConfig(process.env));

export const databaseConfig = registerAs('database', () => ({
  url: loadDatabaseConfig(process.env),
}));

export const storageConfig = registerAs('storage', () =>
  loadStorageConfig(process.env),
);
