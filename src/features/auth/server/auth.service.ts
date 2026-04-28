import {connectDB} from "@/config/database";
import {ForgotPasswordType, LoginType, OtpType, ResetPasswordType} from "@/features/auth/shared/auth.validation";
import * as UserRepository from "@/features/user/server/user.repository"
import {NotFoundError} from "@/shared/errors/NotfoundError";
import {BusinessError} from "@/shared/errors/BusinessError";
import bcrypt from "bcrypt";
import ResponseStatus from "@/config/status";
import jwt from "jsonwebtoken";
import sendMail from "@/lib/sendMail";
import {redisClient} from "@/config/redis";

/**
 * Login Service
 * @param loginInfo
 */
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

/**
 * Forgot the password
 * @param payload
 */
export const forgotPasswordService = async (payload: ForgotPasswordType) => {
    // Connect the DB
    await connectDB();

    // checking user exist or not
    const existUser = await UserRepository.findOneByQuery({email: payload.email});
    if (!existUser) {
        throw new NotFoundError('User not found');
    }
    // if exist generate a Random 6 digit otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the otp to the radis db
    await redisClient.set(`otp-${payload.email}`, otp, {
        expiration: {
            type: 'EX',
            value: Number(process.env.OTP_EXPIRES_IN)
        }
    })

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

/**
 * Verify the otp
 * @param payload
 */
export const verifyOtpService = async (payload: OtpType) => {
    const storedOtp = await redisClient.get(`otp-${payload.email}`);
    if (!storedOtp) {
        throw new BusinessError('OTP expired', ResponseStatus.BAD_REQUEST);
    }


    if (Number(storedOtp) !== payload.otp) {
        throw new BusinessError('Invalid OTP', ResponseStatus.BAD_REQUEST);
    }

    await redisClient.del(`otp-${payload.email}`);

    // Set the verification satus into redis client
    await redisClient.set(`verified-${payload.email}`, 'true', {
        expiration: {
            type: "EX",
            value: Number(process.env.VERIFICATION_EXPIRES_IN)
        }
    })
    return {
        success: true,
        message: 'OTP verified successfully'
    }
}

/**
 * Reset the password
 * @param payload
 */
export const resetPasswordService = async (payload: ResetPasswordType) => {
    // Connect the DB
    await connectDB();

    // checking user exist or not
    const existUser = await UserRepository.findOneByQuery({email: payload.email});
    if (!existUser) {
        throw new NotFoundError('User not found');
    }

    // Checking does user otp verified or not
    const isVerified = await redisClient.get(`verified-${payload.email}`);
    if (!Boolean(isVerified)) {
        throw new BusinessError('OTP not verified', ResponseStatus.BAD_REQUEST);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

    // Update the user password
    const result = await UserRepository.updateById(existUser._id as string, {password: hashedPassword})

    if (!result.matchedCount) {
        throw new BusinessError('Password rest failed', ResponseStatus.INTERNAL_SERVER_ERROR)
    }

    // Delete the verification status from the redis
    await redisClient.del(`verified-${payload.email}`);

    return {
        success: true,
        message: 'Password reset successfully'
    };
}