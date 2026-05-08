import { NextRequest } from "next/server";
import * as CategoryController from "@/features/category/server/category.controller";

/**
 * Get all category list
 * @param req NextRequest
 */
export async function GET() {
  return await CategoryController.getCategories();
}

/**
 * Create new category
 * @params req NextRequest
 */
export async function POST(req: NextRequest) {
  return await CategoryController.createCategory(req);
}
