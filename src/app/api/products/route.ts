import { NextRequest } from "next/server";
import * as ProductController from "@/features/product/server/product.controller";

export function GET(req: NextRequest) {
  return ProductController.getProducts(req);
}

export function POST(req: NextRequest) {
  return ProductController.createProduct(req);
}

