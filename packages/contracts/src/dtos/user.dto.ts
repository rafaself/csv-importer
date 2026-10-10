import type z from "zod";
import type { createUserSchema } from "../schemas/user/create-user.schema.js";

export type CreateUserDto = z.infer<typeof createUserSchema>;
