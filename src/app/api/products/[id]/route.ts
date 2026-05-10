import { NextRequest } from "next/server";
import * as ProductController from "@/features/product/server/product.controller";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/products/[id]">,
) {
  return ProductController.getProductById(ctx);
}

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<"/api/products/[id]">,
) {
  return ProductController.updateProduct(ctx, req);
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/products/[id]">,
) {
  return ProductController.deleteProduct(ctx);
}

