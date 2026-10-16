export function loadApiConfig(env: NodeJS.ProcessEnv) {
  const apiPort = Number(env.API_PORT?.trim());
  if (apiPort < 1 || apiPort > 65535) {
    throw new Error("API_PORT must be a number between 1 and 65535.");
  }

  const apiUrl = env.API_URL?.trim();
  if (!apiUrl) {
    throw new Error("API_URL is required.");
  }

  const apiHost = env.API_HOST?.trim();
  if (!apiHost) {
    throw new Error("API_HOST is required.");
  }

  return { apiUrl, apiHost, apiPort };
}
