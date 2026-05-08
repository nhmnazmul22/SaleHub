import CategoryModel from "@/features/category/server/category.model";
import { Types, UpdateWriteOpResult } from "mongoose";
import {
  CategoryType,
  CategoryUpdateType,
} from "@/features/category/shared/category.validation";
import { buildTree } from "@/lib/utils";

export const findAll = async (
  query?: Record<string, string>,
): Promise<CategoryType[] | []> => {
  return CategoryModel.aggregate([
    {
      $match: query || {},
    },
    {
      $lookup: {
        from: "categories",
        localField: "parentId",
        foreignField: "_id",
        as: "parent",
      },
    },
    {
      $unwind: {
        path: "$parent",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        isActive: 1,
        parent: {
          _id: 1,
          name: 1,
          isActive: 1,
        },
      },
    },
  ]);
};

export const findLikeTree = async () => {
  const categories = await CategoryModel.aggregate([
    {
      $match: {
        parentId: null,
      },
    },

    {
      $graphLookup: {
        from: "categories",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentId",
        as: "children",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        isActive: 1,
        children: {
          _id: 1,
          name: 1,
          parentId: 1,
          isActive: 1,
        },
      },
    },
  ]);

  return categories.map((category) => {
    return {
      _id: category._id,
      name: category.name,
      isActive: category.isActive,
      children: buildTree(category.children, category._id),
    };
  });
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<CategoryType | null> => {
  return CategoryModel.findOne(query).populate({
    path: "parentId",
    select: "_id name",
  });
};

export const findById = async (id: string): Promise<CategoryType | null> => {
  return CategoryModel.findOne({ _id: new Types.ObjectId(id) }).populate({
    path: "parentId",
    select: "_id name",
  });
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
