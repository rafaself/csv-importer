export interface StorageConfig {
  driver: string;
  root: string;
  signingKey?: string;
  objectStorage?: {
    endpoint: string;
    region: string;
    publicBucket: string;
    privateBucket: string;
  };
}

type DriverOptions = "local" | "s3";

export default function loadStorageConfig(
  env: NodeJS.ProcessEnv,
): StorageConfig {
  const root = env.STORAGE_ROOT?.trim() ?? "storage";
  const signingKey = env.SIGNING_KEY?.trim();

  const rawDriver = env.STORAGE_DRIVER?.trim().toLowerCase() ?? "local";
  if (rawDriver !== "local" && rawDriver !== "s3") {
    throw new Error(`Unsupported storage driver: ${rawDriver}`);
  }
  const driver: DriverOptions = rawDriver;

  if (driver === "local") {
    return {
      driver,
      root,
      signingKey,
    };
  }

  if (driver === "s3") {
    const endpoint = env.S3_ENDPOINT?.trim();
    const region = env.S3_REGION?.trim();
    const publicBucket = env.S3_APP_BUCKET?.trim();
    const privateBucket = env.S3_PRIVATE_BUCKET?.trim();

    if (!endpoint || !region || !publicBucket || !privateBucket) {
      throw new Error("Missing required S3 storage configuration.");
    }

    return {
      driver,
      root,
      signingKey,
      objectStorage: {
        endpoint,
        region,
        publicBucket,
        privateBucket,
      },
    };
  }

  throw new Error(`Unsupported storage driver: ${driver}`);
}
