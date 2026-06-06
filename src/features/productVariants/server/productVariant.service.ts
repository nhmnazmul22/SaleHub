import * as ProductVariantRepo from "@/features/productVariants/server/productVariant.repository";
import {connectDB} from "@/config/database";

export const getProductVariants = async (productId: string) => {
    await connectDB();
    return await ProductVariantRepo.findAllByQuery({productId});
}