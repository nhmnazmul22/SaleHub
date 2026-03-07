import {z} from "zod";

export const purchaseItemSchema = z.object({
    purchaseId: z.string().min(1),
    productId: z.string().min(1),
    productVariantId: z.string().min(1),
    unitPrice: z.number().min(0).default(0),
    salePrice: z.number().min(0).default(0),
    subTotal: z.number().min(0).default(0),
    grandTotal: z.number().min(0).default(0),
    discount: z.number().min(0).default(0),
    vat: z.number().min(0).default(0),
    receivedQty: z.number().min(0).default(0),
    bonusQty: z.number().min(0).default(0),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type PurchaseItemType = z.infer<typeof purchaseItemSchema>;
