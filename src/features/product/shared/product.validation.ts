import { objectId } from "@/types";
import { VatDiscountEnumType } from "@/types/enumType";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  slug: z.string().trim().optional(),
  categoryId: objectId,
  brandId: objectId,
  unitId: objectId,
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  basePrice: z.number().min(0).default(0),
  baseShippingAmount: z.number().min(0).default(0),
  discountEnabled: z.boolean().default(false),
  discountType: z
    .enum([VatDiscountEnumType.PERCENT, VatDiscountEnumType.FIXED])
    .default(VatDiscountEnumType.FIXED),
  discountAmount: z.number().min(0).default(0),
  vatEnabled: z.boolean().default(false),
  vatType: z
    .enum([VatDiscountEnumType.PERCENT, VatDiscountEnumType.FIXED])
    .default(VatDiscountEnumType.FIXED),
  vatAmount: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
  createdBy: objectId,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export const productUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  slug: z.string().trim().optional(),
  categoryId: objectId.optional(),
  brandId: objectId.optional(),
  unitId: objectId.optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  basePrice: z.number().min(0).default(0),
  baseShippingAmount: z.number().min(0).default(0),
  discountEnabled: z.boolean().default(false),
  discountType: z
    .enum([VatDiscountEnumType.PERCENT, VatDiscountEnumType.FIXED])
    .default(VatDiscountEnumType.FIXED),
  discountAmount: z.number().min(0).default(0),
  vatEnabled: z.boolean().default(false),
  vatType: z
    .enum([VatDiscountEnumType.PERCENT, VatDiscountEnumType.FIXED])
    .default(VatDiscountEnumType.FIXED),
  vatAmount: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type ProductType = z.infer<typeof productSchema>;
export type ProductUpdateType = z.infer<typeof productUpdateSchema>;
