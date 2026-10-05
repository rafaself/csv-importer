import { existsSync } from "node:fs";

export interface AppConfig {
  databaseUrl: string;
  apiPort: number;
  apiHost: string;
  apiUrl: string;
}

const rootEnvFile = new URL("../../../.env", import.meta.url);

export function readAppConfig(): AppConfig {
  if (existsSync(rootEnvFile)) {
    process.loadEnvFile(rootEnvFile);
  }

  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required.");
  }

  const rawApiPort = process.env.API_PORT?.trim();
  if (!rawApiPort || !/^\d+$/.test(rawApiPort)) {
    throw new Error("API_PORT must be a number between 1 and 65535.");
  }

  const apiUrl = process.env.API_URL?.trim();
  if (!apiUrl) {
    throw new Error("API_URL is required.");
  }

  const apiHost = process.env.API_HOST?.trim();
  if (!apiHost) {
    throw new Error("API_HOST is required.");
  }

  const apiPort = Number(rawApiPort);
  if (apiPort < 1 || apiPort > 65535) {
    throw new Error("API_PORT must be a number between 1 and 65535.");
  }

  return { databaseUrl, apiPort, apiHost, apiUrl };
}
