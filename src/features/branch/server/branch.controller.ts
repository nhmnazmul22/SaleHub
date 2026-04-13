import { NextRequest, NextResponse } from "next/server";
import * as BranchService from "@/features/branch/server/branch.service";
import ResponseStatus from "@/config/status";
import { handleError } from "@/helper/error.helper";

export const getBranches = async () => {
  try {
    const result = await BranchService.getAllBranch();
    return NextResponse.json(
      {
        success: true,
        message: "Branches retrieved successful",
        data: result,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const createBranch = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const branch = await BranchService.createBranch(body);
    return NextResponse.json(
      {
        success: true,
        message: "Branch create successful",
        data: branch,
      },
      { status: ResponseStatus.CREATED },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateBranch = async (
  req: NextRequest,
  ctx: RouteContext<"/api/branches/[id]">,
) => {
  try {
    const { id } = await ctx.params;
    const body = await req.json();

    const result = await BranchService.updateBranch(id, body);

    return NextResponse.json(
      {
        success: true,
        message: "Branch updated successful",
        data: result,
      },
      { status: ResponseStatus.ACCEPTED },
    );
  } catch (error) {
    return handleError(error);
  }
};
