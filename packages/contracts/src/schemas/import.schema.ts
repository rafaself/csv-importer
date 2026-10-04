import z from "zod";

export const createImportSchema = z.strictObject({
  originalFileName: z.string(),
  storageKey: z.string(),
});
