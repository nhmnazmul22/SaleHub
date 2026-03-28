import { NextRequest, NextResponse } from "next/server";
import { registrationValidation } from "@/features/auth/shared/auth.validation";
import { z } from "zod";
import UserModel from "@/features/user/server/user.model";
import { RoleEnumType } from "@/types/enumType";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationResult = registrationValidation.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: z.flattenError(validationResult.error).fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email } = validationResult.data;
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 },
      );
    }

    const newUser = await UserModel.create({
      ...validationResult.data,
      role: RoleEnumType.ADMIN,
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
