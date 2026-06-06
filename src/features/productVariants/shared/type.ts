import {productVariantCreateSchema} from "./productVariant.validation";
import z from "zod";
import {UserMinifiedRes} from "@/features/user/shared/type";

export type ProductVariantInputType = z.infer<typeof productVariantCreateSchema>;
export type ProductVariantType = ProductVariantInputType & {
    createdBy: UserMinifiedRes,
    createdAt: Date | undefined,
    updatedAt: Date | undefined,
    deletedAt: Date | null,
}