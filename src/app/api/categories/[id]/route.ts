import * as CategoryController from "@/features/category/server/category.controller";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/categories/[id]">,
) {
  return CategoryController.getCategoryById(ctx);
}

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<"/api/categories/[id]">,
) {
  return CategoryController.updateCategory(ctx, req);
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/categories/[id]">,
) {
  return CategoryController.deleteCategory(ctx);
}
