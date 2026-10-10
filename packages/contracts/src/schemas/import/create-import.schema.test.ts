import { describe, expect, it } from "vitest";
import { createImportSchema } from "./create-import.schema.js";

describe("create import", () => {
  it("validates create import schema with valids orinal file name and storage key", () => {
    const importData = {
      originalFileName: "my-file.csv",
      storageKey: "some-random-key",
    };

    const result = createImportSchema.safeParse(importData);
    expect(result.success).toBe(true);
  });
});
