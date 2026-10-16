interface LocalObjectStorage {
  root: string;
  signingKey: string;
  baseUrl: string;
}

interface S3ObjectStorage {
  endpoint?: string;
  region: string;
  publicBucket: string;
  privateBucket: string;
  publicUrl: string;
}

type StorageConfig =
  | {
      driver: "local";
      objectStorage: LocalObjectStorage;
    }
  | {
      driver: "s3";
      objectStorage: S3ObjectStorage;
    };

export type { StorageConfig, S3ObjectStorage, LocalObjectStorage };
