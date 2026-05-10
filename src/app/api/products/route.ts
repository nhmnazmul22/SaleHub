import { NextRequest } from "next/server";
import * as ProductController from "@/features/product/server/product.controller";

export function GET() {
  return ProductController.getProducts();
}

export function POST(req: NextRequest) {
  return ProductController.createProduct(req);
}
