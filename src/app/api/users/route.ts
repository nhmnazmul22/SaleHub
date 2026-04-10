import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/features/user/server/user.model";
import { userSchemaType } from "@/features/user/shared/user.validation";
import { z } from "zod";
import ResponseStatus from "@/config/status";
import { connectDB } from "@/config/database";

/**
 * Get all users
 * @param _req NextResponse
 */
export async function GET(_req: NextRequest) {
  await connectDB();

  const users = await UserModel.find({});

  return NextResponse.json({
    success: true,
    message: "Users retrieved successful",
    data: users,
  });
}

/**
 * Create new user with validation
 * @param req NextRequest
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const validationResult = userSchemaType.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user data",
          errors: z.flattenError(validationResult.error).fieldErrors,
        },
        { status: ResponseStatus.UNPROCESSABLE_ENTITY },
      );
    }

    const userData = validationResult.data;

    // Checking if the email already exists
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: ResponseStatus.BAD_REQUEST },
      );
    }

    // If validation is successful and email is unique, create the user
    const newUser = await UserModel.create(userData);

    if (!newUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create user",
        },
        { status: ResponseStatus.INTERNAL_SERVER_ERROR },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: newUser,
      },
      { status: ResponseStatus.CREATED },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while creating the user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: ResponseStatus.INTERNAL_SERVER_ERROR },
    );
  }
}
