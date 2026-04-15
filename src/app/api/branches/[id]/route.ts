import * as BranchController from "@/features/branch/server/branch.controller";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/branches/[id]">,
) {
  return BranchController.getBranchInfo(req, ctx);
}

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<"/api/branches/[id]">,
) {
  return BranchController.updateBranch(req, ctx);
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/branches/[id]">,
) {
  return BranchController.deleteBranch(req, ctx);
}
