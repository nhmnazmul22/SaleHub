import { NextRequest } from "next/server";
import * as ProductVariantController from "@/features/productVariants/server/productVariant.controller";

export function GET() {
  return ProductVariantController.getProductVariant();
}

export function POST(req: NextRequest) {
  return ProductVariantController.createProductVariant(req);
}
