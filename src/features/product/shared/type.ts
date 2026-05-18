import z from "zod";
import { productSchema, productUpdateSchema } from "./product.validation";
import { CategoryType } from "@/features/category/shared/category.validation";
import { BrandType } from "@/features/brand/shared/brand.validation";
import { UnitType } from "@/features/unit/shared/unit.validation";

export type ProductInputType = z.infer<typeof productSchema>;
export type ProductType = Omit<ProductInputType, "image" | "images"> & {
  imageUrl: string | null;
  images?: string[];
  slug: string;
  createdBy: string;
};
export type ProductUpdateType = z.infer<typeof productUpdateSchema>;

export type ProductResponseType = Omit<
  ProductType,
  "categoryId" | "brandId" | "unitId" | "deletedAt" | "createdBy"
> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  category: Omit<CategoryType, "deletedAt" | "createdAt" | "updatedAt">;
  brand: Omit<BrandType, "deletedAt" | "createdAt" | "updatedAt">;
  unit: Omit<UnitType, "deletedAt" | "createdAt" | "updatedAt">;
  created: CreatedByType;
};

export type CreatedByType = {
  _id: string;
  email: string;
  firstName: string;
  lastName?: string | null;
  role: string;
  isActive: boolean;
};
