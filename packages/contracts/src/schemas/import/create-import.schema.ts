import z from "zod";

export const createImportSchema = z.object({
  originalFileName: z.string().length(1024),
  storageKey: z.string(),
});
