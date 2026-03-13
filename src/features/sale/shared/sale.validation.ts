import {z} from "zod";
import {SaleStatusEnumType} from "@/types/enumType";

export const saleSchema = z.object({
    invoiceNumber: z.string().min(1),
    customerId: z.string().min(1),
    branchId: z.string().min(1),
    subTotal: z.number().min(0).default(0),
    grandTotal: z.number().min(0).default(0),
    totalDiscount: z.number().min(0).default(0),
    totalVat: z.number().min(0).default(0),
    status: z.enum(Object.values(SaleStatusEnumType)).default(SaleStatusEnumType.COMPLETED),
    createdBy: z.string().min(1),
    saleDate: z.date().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type SaleType = z.infer<typeof saleSchema>;