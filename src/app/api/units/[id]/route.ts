import * as UnitController from "@/features/unit/server/unit.controller";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/units/[id]">,
) {
  return UnitController.getUnitById(ctx);
}

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<"/api/units/[id]">,
) {
  return UnitController.updateUnit(ctx, req);
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/units/[id]">,
) {
  return UnitController.deleteUnit(ctx);
}
