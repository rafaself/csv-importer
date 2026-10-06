import { ConfigService } from '@nestjs/config';
import { LocalDisk, S3Disk, type StorageModuleOptions } from '@nestjs/storage';

export function createStorageOptions(
  config: ConfigService,
): StorageModuleOptions {
  const apiUrl = config.getOrThrow<string>('apiUrl');
  const root = config.getOrThrow<string>('storage.root');
  const driver = config.getOrThrow<string>('storage.driver');

  if (driver === 's3') {
    const s3 = {
      endpoint: config.get<string>('storage.objectStorage.endpoint'),
      region: config.getOrThrow<string>('storage.objectStorage.region'),
    };
    return {
      default: 'private',
      disks: {
        public: new S3Disk({
          ...s3,
          bucket: config.getOrThrow<string>(
            'storage.objectStorage.publicBucket',
          ),
        }),
        private: new S3Disk({
          ...s3,
          bucket: config.getOrThrow<string>(
            'storage.objectStorage.privateBucket',
          ),
        }),
      },
    };
  } else if (driver === 'local') {
    return {
      default: 'private',
      disks: {
        public: new LocalDisk({
          root: `${root}/public`,
          publicUrl: `${apiUrl}/public`,
        }),

        private: new LocalDisk({
          root: `${root}/private`,
          signedUrls: {
            baseUrl: `${apiUrl}/files`,
            keys: [config.getOrThrow<string>('storage.signingKey')],
          },
        }),
      },
    };
  }

  throw Error('You must specify an storage driver.');
}
