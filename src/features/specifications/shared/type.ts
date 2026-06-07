import z from "zod";
import {
    specificationKeyInputSchema,
    specificationKeyUpdateSchema,
    specificationValueInputSchema,
    specificationValueUpdateSchema,
} from "@/features/specifications/shared/specification.validation";

export type SpecificationKeyInputType = z.infer<typeof specificationKeyInputSchema>
export type SpecificationKeyUpdateType = z.infer<typeof specificationKeyUpdateSchema>

export type SpecificationValueInputType = z.infer<typeof specificationValueInputSchema>
export type SpecificationValueUpdateType = z.infer<typeof specificationValueUpdateSchema>

export type SpecificationKey = {
    _id?: string;
    key: string;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export type SpecificationValue = {
    _id?: string;
    keyId: string;
    value: string;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
