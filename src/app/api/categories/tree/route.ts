import * as CategoryController from "@/features/category/server/category.controller";

export const GET = async () => {
  return await CategoryController.getCategoriesTree();
};
