import z from "zod";
import { productSchema, productUpdateSchema } from "./product.validation";

export type ProductInputType = z.infer<typeof productSchema>;
export type ProductType = Omit<ProductInputType, "image" | "images"> & {
  imageUrl: string | null;
  images?: string[];
  slug: string;
  createdBy: string;
};
export type ProductUpdateType = z.infer<typeof productUpdateSchema>;
