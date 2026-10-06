import { ConfigService } from '@nestjs/config';
import { LocalDisk, type StorageModuleOptions } from '@nestjs/storage';

export function createStorageOptions(
  config: ConfigService,
): StorageModuleOptions {
  const appUrl = config.getOrThrow<string>('appUrl');
  const root = config.getOrThrow<string>('storage.root');
  return {
    default: 'private',
    disks: {
      public: new LocalDisk({
        root: `${root}/public`,
        publicUrl: `${appUrl}/public`,
      }),

      private: new LocalDisk({
        root: `${root}/private`,
        signedUrls: {
          baseUrl: `${appUrl}/files`,
          keys: [config.getOrThrow<string>('storage.signingKey')],
        },
      }),
    },
  };
}
