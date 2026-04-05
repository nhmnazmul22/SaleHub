import {z} from "zod";
import {objectId} from "@/types";

export const supplierSchema = z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    companyName: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    email: z.email("Invalid email address").trim(),
    address: z.string().trim().min(1, "Address is required"),
    contactPerson: z.string().trim().optional(),
    taxId: z.string().trim().optional(),
    nid: z.string().trim().optional(),
    isActive: z.boolean().optional().default(true),
    createdBy: objectId,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type SupplierType = z.infer<typeof supplierSchema>;