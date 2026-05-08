import { connectDB } from "@/config/database";
import * as CategoryRepository from "@/features/category/server/category.repository";
import { BusinessError } from "@/shared/errors/BusinessError";
import ResponseStatus from "@/config/status";
import mongoose from "mongoose";
import { NotFoundError } from "@/shared/errors/NotfoundError";
import {
  CategoryType,
  CategoryUpdateType,
} from "@/features/category/shared/category.validation";

export const getCategories = async () => {
  await connectDB();
  const categories = await CategoryRepository.findAll();
  return categories;
};

export const createCategory = async (payload: CategoryType) => {
  await connectDB();

  // Checking if the category already exists
  const existingCategory: CategoryType | null =
    await CategoryRepository.findOneByQuery({
      name: payload.name,
    });

  if (existingCategory) {
    throw new BusinessError("Category already exists with this name");
  }

  // If validation is successful and name is unique, create the category
  const newCategory = await CategoryRepository.createOne(payload);

  if (!newCategory) {
    throw new BusinessError(
      "Failed to create category",
      ResponseStatus.INTERNAL_SERVER_ERROR,
    );
  }

  return newCategory;
};

export const updateCategory = async (
  categoryId: string,
  body: CategoryUpdateType,
) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new BusinessError(
      "Please, provide valid category id for update category!",
    );
  }
  // check existence
  await connectDB();

  const existCategory = await CategoryRepository.findById(categoryId);

  if (!existCategory) {
    throw new NotFoundError(`Category not found with id: ${categoryId}`);
  }

  // update
  return await CategoryRepository.updateById(categoryId, body);
};

export const deleteCategory = async (categoryId: string) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new BusinessError(
      "Please, provide valid category id for delete category!",
    );
  }

  await connectDB();

  const existCategory = await CategoryRepository.findById(categoryId);
  if (!existCategory) {
    throw new NotFoundError(`Category not found with id: ${categoryId}`);
  }

  return await CategoryRepository.deleteById(categoryId);
};

export const getCategory = async (categoryId: string) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new BusinessError(
      "Please, provide valid category id to get category info!",
    );
  }

  await connectDB();

  const existCategory = await CategoryRepository.findById(categoryId);
  if (!existCategory) {
    throw new NotFoundError(`Category not found with id: ${categoryId}`);
  }

  return existCategory;
};
