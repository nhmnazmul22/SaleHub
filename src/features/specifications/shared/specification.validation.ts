import z from "zod";
import {objectId} from "@/types";

export const specificationKeyInputSchema = z.object({
    key: z.string().trim().min(1, "Specification key is required")
});

export const specificationKeyUpdateSchema = z.object({
    key: z.string().trim().min(1, "Specification key is required").optional(),
    deletedAt: z.date().optional(),
});

export const specificationValueInputSchema = z.object({
    keyId: objectId,
    value: z.string().trim().min(1, "Specification value is required")
});

export const specificationValueUpdateSchema = z.object({
    keyId: objectId.optional(),
    value: z.string().trim().min(1, "Specification value is required").optional(),
    deletedAt: z.date().optional(),
});
