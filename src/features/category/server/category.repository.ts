import CategoryModel from "@/features/category/server/category.model";
import { Types, UpdateWriteOpResult } from "mongoose";
import {
  CategoryType,
  CategoryUpdateType,
} from "@/features/category/shared/category.validation";

export const findAll = async (
  query?: Record<string, string>,
): Promise<CategoryType[] | []> => {
  return CategoryModel.find(query);
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<CategoryType | null> => {
  return CategoryModel.findOne(query);
};

export const findById = async (id: string): Promise<CategoryType | null> => {
  return CategoryModel.findOne({ _id: new Types.ObjectId(id) });
};

export const createOne = async (data: CategoryType): Promise<CategoryType> => {
  return await CategoryModel.create(data);
};

export const updateById = async (
  id: string,
  data: Partial<CategoryUpdateType>,
): Promise<UpdateWriteOpResult> => {
  return CategoryModel.updateOne(
    { _id: new Types.ObjectId(id) },
    { $set: data },
  );
};

export const deleteById = async (id: string) => {
  return CategoryModel.deleteOne({ _id: new Types.ObjectId(id) });
};
