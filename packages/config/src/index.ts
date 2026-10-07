import { existsSync } from "node:fs";
import loadStorageConfig, { StorageConfig } from "./storage.js";
import loadApiConfig from "./api.js";
import { loadDatabaseConfig } from "./database.js";

export type { StorageConfig };
export { loadStorageConfig, loadDatabaseConfig, loadApiConfig };

export interface AppConfig {
  databaseUrl: string;
  apiPort: number;
  apiHost: string;
  apiUrl: string;
}
