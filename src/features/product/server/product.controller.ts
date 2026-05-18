import { NextRequest, NextResponse } from "next/server";
import * as ProductService from "@/features/product/server/product.service";
import { verifyAdminAuth } from "@/lib/verifyAuth";
import ResponseStatus from "@/config/status";
import { handleError } from "@/helper/error.helper";
import {
  productSchema,
  productUpdateSchema,
} from "@/features/product/shared/product.validation";
import { ValidationError } from "@/shared/errors/ValidationError";
import z from "zod";

export const getProducts = async () => {
  try {
    await verifyAdminAuth();

    const products = await ProductService.getProducts();
    return NextResponse.json(
      {
        success: true,
        message: "Products retrieved successfully",
        data: products,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getProductById = async (
  ctx: RouteContext<"/api/products/[id]">,
) => {
  try {
    await verifyAdminAuth();

    const { id } = await ctx.params;
    const product = await ProductService.getProductById(id);

    return NextResponse.json(
      {
        success: true,
        message: "Product retrieved successfully",
        data: product,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const createProduct = async (req: NextRequest) => {
  try {
    const body = await req.formData();
    const auth = await verifyAdminAuth();

    const raw = Object.fromEntries(body.entries());

    const parsedPayload = {
      ...raw,
      image: body.get("image") as File,
      images: body.getAll("images") as File[],
      basePrice: Number(raw.basePrice),
      baseShippingAmount: Number(raw.baseShippingAmount),
      discountEnabled: raw.discountEnabled === "true",
      discountAmount: Number(raw.discountAmount),
      vatEnabled: raw.vatEnabled === "true",
      vatAmount: Number(raw.vatAmount),
    };

    const validationResult = productSchema.safeParse(parsedPayload);

    if (!validationResult.success) {
      throw new ValidationError(
        z.flattenError(validationResult.error).fieldErrors,
      );
    }

    const result = await ProductService.createProduct(
      validationResult.data,
      String(auth.id),
    );

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: result,
      },
      { status: ResponseStatus.CREATED },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateProduct = async (
  ctx: RouteContext<"/api/products/[id]">,
  req: NextRequest,
) => {
  try {
    await verifyAdminAuth();

    const { id } = await ctx.params;
    const body = await req.formData();


    const raw = Object.fromEntries(body.entries());

    const parsedPayload = {
      ...raw,
      image: body.get("image") as File,
      images: body.getAll("images") as File[],
      basePrice: Number(raw.basePrice),
      baseShippingAmount: Number(raw.baseShippingAmount),
      discountEnabled: raw.discountEnabled === "true",
      discountAmount: Number(raw.discountAmount),
      vatEnabled: raw.vatEnabled === "true",
      vatAmount: Number(raw.vatAmount),
    };

    const validationResult = productUpdateSchema.safeParse(parsedPayload);

    if (!validationResult.success) {
      throw new ValidationError(
        z.flattenError(validationResult.error).fieldErrors,
      );
    }

    const result = await ProductService.updateProduct(
      id,
      validationResult.data,
    );
    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        data: result,
      },
      { status: ResponseStatus.ACCEPTED },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const deleteProduct = async (
  ctx: RouteContext<"/api/products/[id]">,
) => {
  try {
    await verifyAdminAuth();

    const { id } = await ctx.params;
    const result = await ProductService.deleteProduct(id);

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successful",
        data: result,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};
