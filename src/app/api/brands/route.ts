import { NextRequest } from "next/server";
import * as BrandController from "@/features/brand/server/brand.controller";

export async function GET() {
  return await BrandController.getBrands();
}

export async function POST(req: NextRequest) {
  return await BrandController.createBrand(req);
}
