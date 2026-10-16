import {
  LocalObjectStorage,
  S3ObjectStorage,
  StorageConfig,
} from "@csv/config";
import { LocalDisk, S3Disk, type StorageModuleOptions } from "@nestjs/storage";
import { join } from "node:path";

export function createStorageOptions(
  config: StorageConfig,
): StorageModuleOptions {
  switch (config.driver) {
    case "s3":
      return getS3Config(config.objectStorage);

    case "local":
      return getLocalConfig(config.objectStorage);

    default:
      throw new Error("Invalid storage driver");
  }
}

function getS3Config(config: S3ObjectStorage): StorageModuleOptions {
  const { endpoint, region, privateBucket, publicBucket, publicUrl } = config;

  return {
    default: "private",
    disks: {
      public: new S3Disk({
        endpoint,
        region,
        bucket: publicBucket,
        publicUrl,
      }),
      private: new S3Disk({
        endpoint,
        region,
        bucket: privateBucket,
      }),
    },
  };
}

function getLocalConfig(config: LocalObjectStorage): StorageModuleOptions {
  const { root, signingKey } = config;
  const baseUrl = config.baseUrl.replace(/\/+$/, "");

  return {
    default: "private",
    disks: {
      public: new LocalDisk({
        root: join(root, "public"),
        publicUrl: `${baseUrl}/files/public`,
      }),
      private: new LocalDisk({
        root: join(root, "private"),
        signedUrls: {
          baseUrl: `${baseUrl}/files/private`,
          keys: [signingKey],
        },
      }),
    },
  };
}
