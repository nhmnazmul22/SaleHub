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

export const resetPasswordValidation = z.object({
    email: z.email().trim(),
    newPassword: z.string().trim().min(1, "New password is required"),
    confirmPassword: z.string().trim().min(1, "Confirm password is required"),
}).superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            input: data.confirmPassword,
            path: ["confirmPassword"],
        });
    }
});
;

export type LoginType = z.infer<typeof loginValidation>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordValidation>;
export type OtpType = z.infer<typeof otpValidation>;
export type ResetPasswordType = z.infer<typeof resetPasswordValidation>;