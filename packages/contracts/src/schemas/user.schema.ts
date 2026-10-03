import z from "zod";

export const createUserSchema = z
  .object({
    fullName: z.string().max(128).optional(),
    email: z.email({ pattern: z.regexes.email }).max(256).optional(),
    company: z.string().max(128).optional(),
  })
  .refine((data) => data.fullName || data.email || data.company, {
    error: "At least one field (fullName, email or company) must be provided.",
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;
