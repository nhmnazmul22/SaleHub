import { connectDB } from "@/config/database";
import ResponseStatus from "@/config/status";
import BranchModel from "@/features/branch/server/branch.model";
import { branchSchemaType } from "@/features/branch/shared/branch.validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Get all branch list
 * @param req NextRequest
 */
export async function GET() {
  try {
    await connectDB();
    const branches = await BranchModel.find({});
    return NextResponse.json({
      success: true,
      message: "Branches retrieved successful",
      data: branches,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while retrieving branch data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: ResponseStatus.INTERNAL_SERVER_ERROR },
    );
  }
}

/**
 * Create new branch
 * @params req NextRequest
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const validationResult = branchSchemaType.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid branch data",
          errors: z.flattenError(validationResult.error).fieldErrors,
        },
        { status: ResponseStatus.UNPROCESSABLE_ENTITY },
      );
    }

    const branchInfo = validationResult.data;
    // Checking branch exist or not
    const existBranch = await BranchModel.findOne({ name: branchInfo.name });
    if (existBranch) {
      return NextResponse.json(
        {
          success: false,
          message: `${branchInfo.name} already exist. Try with another name.`,
        },
        { status: ResponseStatus.BAD_REQUEST },
      );
    }

    const newBranch = await BranchModel.create(branchInfo);

    return NextResponse.json(
      {
        success: true,
        message: "Branch create successful",
        data: newBranch,
      },
      { status: ResponseStatus.CREATED },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while create new branch",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: ResponseStatus.INTERNAL_SERVER_ERROR },
    );
  }
}

