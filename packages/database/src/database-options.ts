import "reflect-metadata";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { DataSourceOptions } from "typeorm";
import { readAppConfig } from "@csv/config";
import { entities } from "./entities.js";

const migrationsGlob = join(
  dirname(fileURLToPath(import.meta.url)),
  "migrations",
  "**/*{.ts,.js}",
);

export function getDatabaseOptions(): DataSourceOptions {
  return {
    type: "postgres",
    url: readAppConfig().databaseUrl,
    entities,
    synchronize: false,
    migrations: [migrationsGlob],
  };
}