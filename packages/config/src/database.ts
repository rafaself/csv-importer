export function loadDatabaseConfig(env: NodeJS.ProcessEnv): string {
  const databaseUrl = env.DATABASE_URL?.trim();

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
