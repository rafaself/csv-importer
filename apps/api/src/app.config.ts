import { readAppConfig } from '@csv/config';

export function apiConfig() {
  const config = readAppConfig();

  return {
    apiUrl: config.apiUrl,
    apiPort: config.apiPort,
    storage: config.storage,
  };
}
