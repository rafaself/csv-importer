import z from "zod";

export const createImportSchema = z.object({
  originalFileName: z.string(),
  storageKey: z.string(),
});
