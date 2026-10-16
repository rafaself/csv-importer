import { loadDatabaseConfig } from '@csv/config';
import { createDatabaseOptions } from '@csv/database';
import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () =>
  loadDatabaseConfig(process.env),
);

export const buildDatabaseOptions = (databaseUrl: string) => {
  return createDatabaseOptions(databaseUrl);
};
