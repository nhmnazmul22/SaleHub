import { CategoryType } from "@/features/category/shared/category.validation";
import { CategoryTreeType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {Types} from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildTree = (
  categories: CategoryType[],
  parentId?: string,
): CategoryTreeType[] => {
  return categories
    .filter((item) => String(item.parentId) === String(parentId))
    .map((item) => ({
      _id: item._id,
      name: item.name,
      parentId: item.parentId,
      isActive: item.isActive,
      children: buildTree(categories, item._id),
    }));
};

export const converteObjectId = (id: string)=>{
    return new Types.ObjectId(id)
}