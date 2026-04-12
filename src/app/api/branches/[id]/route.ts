import { updateBranch } from "@/features/branch/server/branch.controller";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<"/api/branches/[id]">,
) {
  return updateBranch(req, ctx);
}
