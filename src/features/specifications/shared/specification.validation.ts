import z from "zod";
import {objectId} from "@/types";

export const specificationKeyInputSchema = z.object({
    key: z.string().min(1, "Specification key is required")
});

export const specificationValueInputSchema = z.object({
    keyId: objectId,
    value: z.string().min(1, "Specification value is required")
});