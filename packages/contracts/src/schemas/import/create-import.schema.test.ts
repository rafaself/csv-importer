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
] as const;

const invalidImportDataWithMissingFields = [
  {
    field: "originalFileName",
    data: { storageKey: "some-random-key" },
  },
  {
    field: "storageKey",
    data: { originalFileName: "my-file.csv" },
  },
] as const;

describe("createImportSchema", () => {
  it.for(validImportData)(
    '{ originalFileName: "$originalFileName", storageKey: "$storageKey" }',
    (data) => {
      const result = createImportSchema.safeParse(data);

      expect(result.success).toBe(true);
    },
  );

  it.for(invalidImportDataWithMissingFields)(
    "rejects the missing required field: $field",
    ({ data, field }) => {
      const result = createImportSchema.safeParse(data);

      expect(result.success).toBe(false);
      expect(result.error?.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: [field],
            code: "invalid_type",
            expected: "string",
          }),
        ]),
      );
    },
  );

  it("rejects invalid storage key", () => {});
});
