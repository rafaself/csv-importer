import { describe, expect, it } from "vitest";
import { createImportSchema } from "./create-import.schema.js";

const validImportData = [
  {
    originalFileName: "my-file-1.csv",
    storageKey: "some-random-key-1",
  },
  {
    originalFileName: "my-file-2.png",
    storageKey: "some-random-key-2",
  },
];

const invalidImportDataWithMissingFields = [
  {
    originalFileName: "my-file.csv",
  },
  {
    storageKey: "some-random-key",
  },
];

describe("createImportSchema", () => {
  it.for(validImportData)(
    '{ originalFileName: "$originalFileName", storageKey: "$storageKey" }',
    (data) => {
      const result = createImportSchema.safeParse(data);

      expect(result.success).toBe(true);
    },
  );

  it.for(invalidImportDataWithMissingFields)(
    "rejects missing required fields",
    (data) => {
      const result = createImportSchema.safeParse(data);

      expect(result.success).toBe(false);
      expect(result.error?.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: "invalid_type",
            message: "Invalid input: expected string, received undefined",
            expected: "string",
          }),
        ]),
      );
    },
  );

  it("rejects invalid storage key", () => {});
});
