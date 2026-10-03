import z from "zod";

export const createUserSchema = z
  .strictObject({
    fullName: z.string().max(128).trim().optional(),
    email: z.email({ pattern: z.regexes.email }).max(256).trim().optional(),
    company: z.string().max(128).trim().optional(),
  })
  .refine((data) => data.fullName || data.email || data.company, {
    error: "At least one field (fullName, email or company) must be provided.",
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;
