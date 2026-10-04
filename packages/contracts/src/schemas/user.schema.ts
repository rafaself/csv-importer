import z from "zod";

export const createUserSchema = z
  .strictObject({
    fullName: z.string().trim().max(128).optional(),

    email: z
      .string()
      .max(256)
      .trim()
      .pipe(z.email({ pattern: z.regexes.email }))
      .optional(),

    company: z.string().trim().max(128).optional(),
  })
  .refine((data) => Boolean(data.fullName || data.email || data.company), {
    error: "At least one field (fullName, email or company) must be provided.",
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;
