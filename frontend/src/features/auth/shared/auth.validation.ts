import { z } from "zod";

export const registrationValidation = z.object({
  firstName: z
    .string({ message: "First name must be a string" })
    .trim()
    .min(1, "First name is required"),
  lastName: z
    .string({ message: "Last name must be a string" })
    .trim()
    .optional(),
  email: z
    .email({
      message: "Invalid Email address, Please provide a valid email address.",
    })
    .trim(),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export const loginValidation = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(1, "Password is required"),
});

export type RegistrationType = z.infer<typeof registrationValidation>;
export type LoginType = z.infer<typeof loginValidation>;
