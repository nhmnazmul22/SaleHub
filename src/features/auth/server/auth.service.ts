import {connectDB} from "@/config/database";
import {LoginType} from "@/features/auth/shared/auth.validation";
import * as UserRepository from "@/features/user/server/user.repository"
import {NotFoundError} from "@/shared/errors/NotfoundError";
import {BusinessError} from "@/shared/errors/BusinessError";
import bcrypt from "bcrypt";
import ResponseStatus from "@/config/status";
import jwt from "jsonwebtoken";

export const loginService = async (loginInfo: LoginType)=>{
    // Connect the DB
    await connectDB();
    const { email, password } = loginInfo;

    // Check if the user already exists or not
    const existUser = await UserRepository.findOneByQuery({email});
    if (!existUser) {
       throw new NotFoundError('User not found');
    }

    // Check the password is correct or not
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
       throw  new BusinessError('Invalid password', ResponseStatus.BAD_REQUEST)
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