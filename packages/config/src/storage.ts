export interface StorageConfig {
  driver: string;
  root: string;
  signingKey?: string;
  objectStorage?: {
    endpoint?: string;
    region: string;
    publicBucket: string;
    privateBucket: string;
  };
}

export default () => {
  var storageDriver =
    process.env.STORAGE_DRIVER?.trim().toLocaleLowerCase() ?? "local";
  var storageRoot = process.env.STORAGE_ROOT?.trim() ?? "storage";
  var signingKey = process.env.SIGNING_KEY?.trim();

  const result: StorageConfig = {
    driver: storageDriver,
    root: storageRoot,
    signingKey,
  };

  if (storageDriver.toLocaleLowerCase() === "s3" && validateS3Variables()) {
    result.objectStorage = {
      endpoint: process.env.S3_ENDPOINT!,
      region: process.env.S3_REGION!,
      publicBucket: process.env.S3_APP_BUCKET!,
      privateBucket: process.env.S3_PRIVATE_BUCKET!,
    };
  } else if (storageDriver.toLocaleLowerCase() === "local") {
    result.objectStorage = {
      region: "auto",
      publicBucket: "store-app-files",
      privateBucket: "store-app-private-files",
    };
  } else {
    throw Error("You must specify an storage driver.");
  }

  return result;
};

function validateS3Variables() {
  return (
    process.env.S3_ENDPOINT &&
    process.env.S3_REGION &&
    process.env.S3_APP_BUCKET &&
    process.env.S3_PRIVATE_BUCKET
  );
}
