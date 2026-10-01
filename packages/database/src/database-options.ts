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

const databaseOptions = {
  type: "postgres" as const,
  url: readAppConfig().databaseUrl,
  entities,
  synchronize: false as const,
  migrations: [migrationsGlob],
} satisfies DataSourceOptions;

export function getDatabaseOptions() {
  return databaseOptions;
}
