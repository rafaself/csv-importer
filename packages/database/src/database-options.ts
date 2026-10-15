import "reflect-metadata";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { DataSourceOptions } from "typeorm";
import { entities } from "./entities.js";

const migrationsGlob = join(
  dirname(fileURLToPath(import.meta.url)),
  "migrations",
  "**/*{.ts,.js}",
);

function validateAndRetrieveDatabaseUrl(databaseUrl: string): string {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required.");
  }

  const POSTGRES_URL_REGEX =
    /^postgres(?:ql)?:\/\/[^:\s]+:[^@\s]+@[^:\s]+:\d+\/[^\s/?#]+(?:\?[^\s#]*)?$/;
  if (!POSTGRES_URL_REGEX.test(databaseUrl)) {
    throw new Error("DATABASE_URL must be a valid PostgreSQL URL.");
  }

  return databaseUrl;
}

export function getDatabaseOptions(env: NodeJS.ProcessEnv): DataSourceOptions {
  return {
    type: "postgres",
    url: validateAndRetrieveDatabaseUrl(env.DATABASE_URL!),
    synchronize: false,
    entities,
    migrations: [migrationsGlob],
  };
}
