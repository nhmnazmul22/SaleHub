import {z} from "zod";
import {objectId} from "@/types";


export const productVariantAttributeSchema = z.object({
    key: z.string().trim().min(1, "Attribute key is required"),
    values: z
        .array(z.string().trim().min(1))
        .min(1, "At least one attribute value is required"),
    productVariantId: objectId,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type ProductVariantAttributeType = z.infer<typeof productVariantAttributeSchema>;