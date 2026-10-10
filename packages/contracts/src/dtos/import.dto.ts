import type z from "zod";
import type { updateImportStatusSchema } from "../schemas/import/update-import.schema.js";
import type { createImportSchema } from "../schemas/import/create-import.schema.js";

export type UpdateImportStatusDto = z.infer<typeof updateImportStatusSchema>;
export type CreateImportDto = z.infer<typeof createImportSchema>;
