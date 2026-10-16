import { StorageConfig } from "@csv/shared";

export function loadStorageConfig(env: NodeJS.ProcessEnv): StorageConfig {
  const storageDriver = env.STORAGE_DRIVER?.trim().toLowerCase() ?? "local";

  switch (storageDriver) {
    case "s3":
      const endpoint = env.S3_ENDPOINT?.trim();
      const region = env.S3_REGION?.trim();
      const publicBucket = env.S3_APP_BUCKET?.trim();
      const privateBucket = env.S3_PRIVATE_BUCKET?.trim();
      const publicUrl = env.PUBLIC_URL?.trim();

      if (
        !endpoint ||
        !region ||
        !publicBucket ||
        !privateBucket ||
        !publicUrl
      ) {
        throw new Error("Missing required S3 storage configuration.");
      }

      return {
        driver: storageDriver,
        objectStorage: {
          endpoint,
          region,
          publicBucket,
          privateBucket,
          publicUrl,
        },
      };

    case "local":
      const storageRoot = env.STORAGE_ROOT?.trim();
      const signingKey = env.SIGNING_KEY?.trim();
      const baseUrl = env.BASE_URL?.trim();

      if (!signingKey || !baseUrl || !storageRoot)
        throw Error(
          "The environment variables 'SIGNING_KEY', 'BASE_URL' and 'STORAGE_ROOT' must be provided.",
        );

      return {
        driver: storageDriver,
        objectStorage: {
          root: storageRoot,
          signingKey,
          baseUrl,
        },
      };

    default:
      throw new Error(
        "Missing or unsupported storage driver. Allowed drivers: 'local' and 's3'.",
      );
  }
}
