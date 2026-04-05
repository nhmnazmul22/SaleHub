import {z} from "zod";
import {PaymentMethodEnumType, PaymentStatusEnumType} from "@/types/enumType";

export const paymentSchema = z.object({
    saleId: z.string().min(1),
    invoiceNumber: z.string().min(1),
    paymentMethod: z.enum(Object.values(PaymentMethodEnumType)).default(PaymentMethodEnumType.CASH),
    amount: z.number().min(0).default(0),
    totalPaidAmount: z.number().min(0).default(0),
    status: z.enum(Object.values(PaymentStatusEnumType)).default(PaymentStatusEnumType.PENDING),
    customerId: z.string().min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type PaymentType = z.infer<typeof paymentSchema>;