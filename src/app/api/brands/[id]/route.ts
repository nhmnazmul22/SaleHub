import * as BrandController from "@/features/brand/server/brand.controller";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/brands/[id]">,
) {
  return BrandController.getBrandById(ctx);
}

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<"/api/brands/[id]">,
) {
  return BrandController.updateBrand(ctx, req);
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/brands/[id]">,
) {
  return BrandController.deleteBrand(ctx);
}
