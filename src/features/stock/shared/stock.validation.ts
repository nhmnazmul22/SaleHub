import {z} from "zod";

export const stockSchema = z.object({
    productVariantId: z.string().min(1),
    branchId: z.string().min(1),
    sku: z.string().min(1),
    invQty: z.number().min(0).default(0),
    reservedQty: z.number().min(0).default(0),
    onOrderQty: z.number().min(0).default(0),
    createdBy: z.string().min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type StockType = z.infer<typeof stockSchema>;