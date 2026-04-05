import { z } from "zod";

export const loginValidation = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(1, "Password is required"),
});

export type LoginType = z.infer<typeof loginValidation>;
