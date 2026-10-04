import z from "zod";
import { ImportStatus } from "@csv/shared";

const createImportSchema = z.strictObject({
  originalFileName: z.string(),
  storageKey: z.string(),
  status: z.enum(ImportStatus),
  totalRows: z.number(),
  rows: z.object({}),
});
