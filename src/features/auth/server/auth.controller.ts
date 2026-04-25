import {NextRequest} from "next/server";
import {loginValidation} from "@/features/auth/shared/auth.validation";
import {ValidationError} from "@/shared/errors/ValidationError";
import * as AuthService from "@/features/auth/server/auth.service";

export const loginController = async (req: NextRequest)=>{
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