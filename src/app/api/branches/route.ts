import { connectDB } from "@/config/database";
import ResponseStatus from "@/config/status";
import BranchModel from "@/features/branch/server/branch.model";
import { NextRequest, NextResponse } from "next/server";

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
