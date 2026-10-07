export default function loadApiConfig(env: NodeJS.ProcessEnv) {
  const rawApiPort = env.API_PORT?.trim();
  if (!rawApiPort || !/^\d+$/.test(rawApiPort)) {
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

  const apiPort = Number(rawApiPort);
  if (apiPort < 1 || apiPort > 65535) {
    throw new Error("API_PORT must be a number between 1 and 65535.");
  }

  return { apiUrl, apiHost, apiPort };
}
