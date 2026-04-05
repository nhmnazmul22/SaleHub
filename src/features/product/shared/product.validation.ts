import { objectId } from "@/types";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  categoryId: objectId,
  brandId: objectId,
  unitId: objectId,
  description: z.string().optional(),
  imageUrl: z.url().optional(),
  isActive: z.boolean().optional(),
  createdBy: objectId,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type ProductType = z.infer<typeof productSchema>;
