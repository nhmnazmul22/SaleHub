import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { loginValidation } from "@/features/auth/shared/auth.validation";
import { z } from "zod";
import UserModel from "@/features/user/server/user.model";
import { connectDB } from "@/config/database";

export async function POST(req: NextRequest) {
  try {
    // Connect the DB
    await connectDB();

    const body = await req.json();

    // Validate the request body
    const validationResult = loginValidation.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: z.flattenError(validationResult.error).fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = validationResult.data;
    // Check if the user already exists or not
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    // Check the password is correct or not
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 },
      );
    }

    // Generate a Token
    const token = jwt.sign(
      {
        id: existUser._id,
        role: existUser.role,
        isActive: existUser.isActive,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: Number(process.env.JWT_EXPIRES_IN) },
    );

    const response = NextResponse.json({
      success: true,
      message: "User logged in successfully",
      token: token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: Number(process.env.JWT_EXPIRES_IN),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
