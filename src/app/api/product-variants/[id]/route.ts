import * as ProductVariantController from "@/features/productVariants/server/productVariant.controller";
import {NextRequest} from "next/server";

export function GET(req: NextRequest,
                    ctx: RouteContext<"/api/product-variants/[id]">
) {
    return ProductVariantController.getProductVariants(ctx);
}