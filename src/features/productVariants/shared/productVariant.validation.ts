import {z} from "zod";
import {objectId} from "@/types";
import {VatDiscountEnumType} from "@/types/enumType";

export const productVariantSchema = z.object({
    sku: z.string().trim().min(1, "SKU is required"),
    productId: objectId,
    purchasePrice: z.number().optional(),
    unitPrice: z.number().optional(),
    sellPrice: z.number().optional(),
    lastUnitPrice: z.number().optional(),
    shippingAmount: z.number().optional(),
    discountEnabled: z.boolean().optional(),
    discountType: z.enum(Object.values(VatDiscountEnumType)).optional(),
    discountAmount: z.number().optional(),
    vatEnabled: z.boolean().optional(),
    vatType: z.enum(Object.values(VatDiscountEnumType)).optional(),
    vatAmount: z.number().optional(),
    createdBy: objectId,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});


export type ProductVariantType = z.infer<typeof productVariantSchema>;