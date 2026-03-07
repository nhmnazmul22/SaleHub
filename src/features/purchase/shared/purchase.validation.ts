import {z} from "zod";
import {objectId} from "@/types";
import {PurchaseStatusEnums} from "@/constants/enum";

export const purchaseSchema = z.object({
    invoiceNumber: z.string().trim().min(1, "Invoice number is required"),
    subTotal: z.number().optional(),
    grandTotal: z.number().optional(),
    totalDiscount: z.number().optional(),
    totalVat: z.number().optional(),
    supplierId: objectId,
    status: z.enum(PurchaseStatusEnums).optional(),
    purchaseDate: z.date().optional(),
    createdBy: objectId,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});


export type PurchaseType = z.infer<typeof purchaseSchema>;