import {ProductVariantType} from "@/features/productVariants/shared/type";
import ProductVariantModel from "@/features/productVariants/server/productVariant.model";
import {productVariantPipeline} from "@/features/productVariants/server/productVariantPipeline";

export const findAllByQuery = async (query: Record<string, unknown>)
    : Promise<ProductVariantType[] | []> => {
    return ProductVariantModel.aggregate(productVariantPipeline(query));
}