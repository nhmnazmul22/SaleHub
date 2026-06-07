import z from "zod";
import {specificationKeyInputSchema} from "@/features/specifications/shared/specification.validation";

export type SpecificationKeyInputType = z.infer<typeof specificationKeyInputSchema>

export type SpecificationKey = {
    key: string;
    createdAt: Date;
    updatedAt: Date;
}