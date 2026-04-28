import {z} from "zod";

export const loginValidation = z.object({
    email: z.email().trim(),
    password: z.string().trim().min(1, "Password is required"),
});

export const forgotPasswordValidation = z.object({
    email: z.email().trim(),
});

export const otpValidation = z.object({
    email: z.email().trim(),
    otp: z.number().min(1, "OTP is required"),
});

export type LoginType = z.infer<typeof loginValidation>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordValidation>;
export type OtpType = z.infer<typeof otpValidation>;