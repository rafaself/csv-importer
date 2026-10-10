import { ImportStatus } from "@csv/shared";
import z from "zod";

export const updateImportStatusSchema = z.object({
  status: z.enum(ImportStatus),
});
