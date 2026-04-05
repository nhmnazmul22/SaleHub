import {z} from "zod";
import {AdjustmentEnumType} from "@/types/enumType";

export const stockTransactionSchema = z.object({
    stockId: z.string().min(1),
    productVariantId: z.string().min(1),
    branchId: z.string().min(1),
    sku: z.string().min(1),
    beforeQty: z.number(),
    quantity: z.number(),
    invQty: z.number(),
    adjustmentType: z.enum(Object.values(AdjustmentEnumType)),
    reason: z.string().nullable().optional(),
    note: z.string().nullable().optional(),
    createdBy: z.string().min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type StockTransactionType = z.infer<typeof stockTransactionSchema>;