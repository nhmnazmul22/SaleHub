import {z} from "zod";

export const customerSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phone: z.string().optional(),
    email: z.email().optional(),
    address: z.string().min(1, "Address is required"),
    createdBy: z.string().min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type CustomerType = z.infer<typeof customerSchema>;