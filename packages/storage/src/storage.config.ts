import { ConfigService } from "@nestjs/config";
import { LocalDisk, S3Disk, type StorageModuleOptions } from "@nestjs/storage";

export function createStorageOptions(
  config: ConfigService,
): StorageModuleOptions {
  const driver = config.getOrThrow<string>("storage.driver");

  if (driver === "s3") {
    return getS3Config(config);
  } else if (driver === "local") {
    return getLocalConfig(config);
  }

  throw Error("You must specify a valid storage driver.");
}

function getS3Config(config: ConfigService) {
  const { endpoint, region, privateBucket, publicBucket } = config.get(
    "storage.objectStorage",
  );

  return {
    default: "private",
    disks: {
      public: new S3Disk({ endpoint, region, bucket: publicBucket }),
      private: new S3Disk({ endpoint, region, bucket: privateBucket }),
    },
  };
}

function getLocalConfig(config: ConfigService) {
  const apiUrl = config.getOrThrow<string>("apiUrl");
  const root = config.getOrThrow<string>("storage.root");
  const signingKey = config.getOrThrow<string>("storage.signingKey");

  return {
    default: "private",
    disks: {
      public: new LocalDisk({
        root: `${root}/public`,
        publicUrl: `http://${apiUrl}/files/public`,
      }),

      private: new LocalDisk({
        root: `${root}/private`,
        signedUrls: {
          baseUrl: `http://${apiUrl}/files/private`,
          keys: [signingKey],
        },
      }),
    },
  };
}
