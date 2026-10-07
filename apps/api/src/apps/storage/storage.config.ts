import { ConfigService } from '@nestjs/config';
import { LocalDisk, S3Disk, type StorageModuleOptions } from '@nestjs/storage';

export function createStorageOptions(
  config: ConfigService,
): StorageModuleOptions {
  const driver = config.getOrThrow<string>('storage.driver');

  if (driver === 's3') {
    return getS3Config(config);
  } else if (driver === 'local') {
    return getLocalConfig(config);
  }

  throw Error('You must specify a valid storage driver.');
}

function getS3Config(config: ConfigService) {
  const s3 = {
    endpoint: config.get<string>('storage.objectStorage.endpoint'),
    region: config.getOrThrow<string>('storage.objectStorage.region'),
  };

  return {
    default: 'private',
    disks: {
      public: new S3Disk({
        ...s3,
        bucket: config.getOrThrow<string>('storage.objectStorage.publicBucket'),
      }),
      private: new S3Disk({
        ...s3,
        bucket: config.getOrThrow<string>(
          'storage.objectStorage.privateBucket',
        ),
      }),
    },
  };
}

function getLocalConfig(config: ConfigService) {
  const apiUrl = config.getOrThrow<string>('apiUrl');
  const root = config.getOrThrow<string>('storage.root');

  return {
    default: 'private',
    disks: {
      public: new LocalDisk({
        root: `${root}/public`,
        publicUrl: `http://${apiUrl}/files/public`,
      }),

      private: new LocalDisk({
        root: `${root}/private`,
        signedUrls: {
          baseUrl: `http://${apiUrl}/files/private`,
          keys: [config.getOrThrow<string>('storage.signingKey')],
        },
      }),
    },
  };
}
