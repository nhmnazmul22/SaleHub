import { NextRequest, NextResponse } from "next/server";
import * as BranchService from "@/features/branch/server/branch.service";
import ResponseStatus from "@/config/status";
import { handleError } from "@/helper/error.helper";

export async function updateBranch(
  req: NextRequest,
  ctx: RouteContext<"/api/branches/[id]">,
) {
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
}
