import {z} from "zod";

export const saleItemSchema = z.object({
    saleId: z.string().min(1),
    productId: z.string().min(1),
    productVariantId: z.string().min(1),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0).default(0),
    discount: z.number().min(0).default(0),
    vat: z.number().min(0).default(0),
    lineTotal: z.number().min(0).default(0),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type SaleItemType = z.infer<typeof saleItemSchema>;