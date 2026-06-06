import { NextRequest, NextResponse } from "next/server";
import * as ProductVariantService from "@/features/productVariants/server/productVariant.service";
import { verifyAdminAuth } from "@/lib/verifyAuth";
import ResponseStatus from "@/config/status";
import { handleError } from "@/helper/error.helper";
import { ValidationError } from "@/shared/errors/ValidationError";
import z from "zod";
import {productVariantCreateSchema} from "@/features/productVariants/shared/productVariant.validation";

export const getProductVariants = async (
    ctx: RouteContext<"/api/product-variants/[id]">,
) => {
    try {
        await verifyAdminAuth();

        const { id } = await ctx.params;
        const productVariants = await ProductVariantService.getProductVariants(id);

        return NextResponse.json(
            {
                success: true,
                message: "Product Variants retrieved successfully",
                data: productVariants,
            },
            { status: ResponseStatus.SUCCESS },
        );
    } catch (error) {
        return handleError(error);
    }
};

export const createProductVariant = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const auth = await verifyAdminAuth();

        const parsedPayload = {
            ...body,
            purchasePrice: Number(body.basePrice ?? 0),
            unitPrice: Number(body.unitPrice ?? 0),
            sellPrice: Number(body.sellPrice ?? 0),
            lastUnitPrice: Number(body.purchasePrice ?? 0),
            shippingAmount: Number(body.shippingAmount ?? 0),
            discountEnabled: body.discountEnabled === "true",
            discountAmount: Number(body.discountAmount),
            vatEnabled: body.vatEnabled === "true",
            vatAmount: Number(body.vatAmount),
        };

        const validationResult = productVariantCreateSchema.safeParse(parsedPayload);

        if (!validationResult.success) {
            throw new ValidationError(
                z.flattenError(validationResult.error).fieldErrors,
            );
        }

        // Logic here

        return NextResponse.json(
            {
                success: true,
                message: "Product created successfully",
                data: {},
            },
            { status: ResponseStatus.CREATED },
        );
    } catch (error) {
        return handleError(error);
    }
};
