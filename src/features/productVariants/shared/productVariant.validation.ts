import {z} from "zod";
import {objectId} from "@/types";
import {VatDiscountEnumType} from "@/types/enumType";

export const productVariantCreateSchema = z.object({
    sku: z.string().trim().min(1, "SKU is required"),
    productId: objectId,
    purchasePrice: z.number().optional().default(0),
    unitPrice: z.number().optional().default(0),
    sellPrice: z.number().optional().default(0),
    lastUnitPrice: z.number().optional().default(0),
    shippingAmount: z.number().optional().default(0),
    discountEnabled: z.boolean().optional().default(false),
    discountType: z.enum(Object.values(VatDiscountEnumType)).optional(),
    discountAmount: z.number().optional().default(0),
    vatEnabled: z.boolean().optional().default(false),
    vatType: z.enum(Object.values(VatDiscountEnumType)).optional(),
    vatAmount: z.number().optional().default(0),
    createdBy: objectId,
});

