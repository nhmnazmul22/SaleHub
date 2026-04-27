import {NextRequest, NextResponse} from "next/server";
import {forgotPasswordValidation, loginValidation, otpValidation} from "@/features/auth/shared/auth.validation";
import {ValidationError} from "@/shared/errors/ValidationError";
import * as AuthService from "@/features/auth/server/auth.service";
import {z} from "zod";
import {handleError} from "@/helper/error.helper";

export const loginController = async (req: NextRequest) => {
    try {
        const body = await req.json();

        // Validate the request body
        const validationResult = loginValidation.safeParse(body);
        if (!validationResult.success) {
            throw new ValidationError(z.flattenError(validationResult.error).fieldErrors,)
        }

        const token = await AuthService.loginService(validationResult.data);

        const response = NextResponse.json({
            success: true,
            message: "User logged in successfully",
            token,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: Number(process.env.JWT_EXPIRES_IN),
        });

        return response
    } catch (error) {
        return handleError(error);
    }
}

export const forgotPasswordController = async (req: NextRequest) => {
    try {
        const body = await req.json();

        // Validate the request body
        const validatedResult = forgotPasswordValidation.safeParse(body);
        if (!validatedResult.success) {
            throw new ValidationError(z.flattenError(validatedResult.error).fieldErrors)
        }

        await AuthService.forgotPasswordService(validatedResult.data);

        return NextResponse.json({success: true, message: "OTP sent to email successfully"});
    } catch (error) {
        return handleError(error)
    }
}


export const verifyOtpController = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const validatedData = otpValidation.safeParse(body);

        if (!validatedData.success) {
            throw new ValidationError(z.flattenError(validatedData.error).fieldErrors);
        }

        await AuthService.verifyOtpService(validatedData.data);

        return NextResponse.json({success: true, message: "OTP verified successfully"});
    } catch (error) {
        return handleError(error)
    }
}