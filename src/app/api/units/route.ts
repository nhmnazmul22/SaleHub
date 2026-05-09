import { NextRequest } from "next/server";
import * as UnitController from "@/features/unit/server/unit.controller";

/**
 * Get all unit list
 * @param req NextRequest
 */
export async function GET() {
  return await UnitController.getUnits();
}

/**
 * Create new unit
 * @params req NextRequest
 */
export async function POST(req: NextRequest) {
  return await UnitController.createUnit(req);
}
