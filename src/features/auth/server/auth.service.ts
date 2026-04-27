import {connectDB} from "@/config/database";
import {ForgotPasswordType, LoginType, OtpType} from "@/features/auth/shared/auth.validation";
import * as UserRepository from "@/features/user/server/user.repository"
import {NotFoundError} from "@/shared/errors/NotfoundError";
import {BusinessError} from "@/shared/errors/BusinessError";
import bcrypt from "bcrypt";
import ResponseStatus from "@/config/status";
import jwt from "jsonwebtoken";
import sendMail from "@/lib/sendMail";

export const loginService = async (loginInfo: LoginType) => {
    // Connect the DB
    await connectDB();
    const {email, password} = loginInfo;

    // Check if the user already exists or not
    const existUser = await UserRepository.findOneByQuery({email});
    if (!existUser) {
        throw new NotFoundError('User not found');
    }

    // Check the password is correct or not
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
        throw new BusinessError('Invalid password', ResponseStatus.BAD_REQUEST)
    }

    // Generate a Token
    return jwt.sign(
        {
            id: existUser._id,
            role: existUser.role,
            isActive: existUser.isActive,
        },
        process.env.JWT_SECRET_KEY!,
        {expiresIn: Number(process.env.JWT_EXPIRES_IN)},
    );
}

export const forgotPasswordService = async (payload: ForgotPasswordType) => {
    // checking user exist or not
    const existUser = await UserRepository.findOneByQuery({email: payload.email});
    if (!existUser) {
        throw new NotFoundError('User not found');
    }
    // if exist generate a Random 6 digit otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send the otp to user email address
    const mailResponse = await sendMail(
        payload.email,
        'OTP Verification',
        `Your OTP is ${otp}`,
        ''
    )

    if (!mailResponse) {
        throw new BusinessError('Something went wrong', ResponseStatus.INTERNAL_SERVER_ERROR);
    }

    return {
        success: true,
        message: 'OTP sent to email successfully'
    }
}

export const verifyOtpService = async (payload: OtpType) => {

}