import { ImportStatus } from "@csv/shared";
import z from "zod";

export const createImportSchema = z.object({
  originalFileName: z.string(),
  storageKey: z.string(),
});

export const updateImportStatusSchema = z.object({
  status: z.enum(ImportStatus),
});
