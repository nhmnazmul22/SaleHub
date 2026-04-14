import { AppError } from "@/shared/errors/AppError";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(error: any) {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        errors: error.details,
      },
      { status: error.statusCode },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Internal server error",
      error: error?.toString(),
    },
    { status: 500 },
  );
}
