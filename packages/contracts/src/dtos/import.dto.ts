import type z from "zod";
import type { updateImportStatusSchema } from "../schemas/import/update-import.schema.js";

export type UpdateImportStatusDto = z.infer<typeof updateImportStatusSchema>;
