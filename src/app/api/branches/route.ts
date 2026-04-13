import { NextRequest } from "next/server";
import * as BranchController from "@/features/branch/server/branch.controller";

/**
 * Get all branch list
 * @param req NextRequest
 */
export async function GET() {
  return await BranchController.getBranches();
}

/**
 * Create new branch
 * @params req NextRequest
 */
export async function POST(req: NextRequest) {
  return await BranchController.createBranch(req);
}
