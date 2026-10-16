export { loadApiConfig } from "./api.js";
export { loadDatabaseConfig } from "./database.js";
export { loadStorageConfig } from "./storage.js";

export interface AppConfig {
  databaseUrl: string;
  apiPort: number;
  apiHost: string;
  apiUrl: string;
}
