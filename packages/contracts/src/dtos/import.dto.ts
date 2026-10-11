import type z from "zod";
import type { createImportSchema } from "../schemas/import/create-import.schema.js";
import type { updateImportSchema } from "../schemas/import/update-import.schema.js";

export type UpdateImportStatusDto = z.infer<typeof updateImportSchema>;
export type CreateImportDto = z.infer<typeof createImportSchema>;
