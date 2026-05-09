import { NextRequest, NextResponse } from "next/server";
import * as BrandService from "@/features/brand/server/brand.service";
import { verifyAdminAuth } from "@/lib/verifyAuth";
import { handleError } from "@/helper/error.helper";
import ResponseStatus from "@/config/status";
import {
  brandSchemaType,
  brandUpdateSchemaType,
} from "@/features/brand/shared/brand.validation";
import { ValidationError } from "@/shared/errors/ValidationError";
import z from "zod";

export const getBrands = async () => {
  try {
    await verifyAdminAuth();

    const brands = await BrandService.getBrands();
    return NextResponse.json(
      {
        success: true,
        message: "Brands retrieved successful",
        data: brands,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getBrandById = async (ctx: RouteContext<"/api/brands/[id]">) => {
  try {
    await verifyAdminAuth();

    const { id } = await ctx.params;
    const brand = await BrandService.getBrandById(id);

    return NextResponse.json(
      {
        success: true,
        message: "Brand retrieved successful",
        data: brand,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const createBrand = async (req: NextRequest) => {
  try {
    await verifyAdminAuth();

    const body = await req.json();
    const validationResult = brandSchemaType.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError(
        z.flattenError(validationResult.error).fieldErrors,
      );
    }

    const result = await BrandService.createBrand(validationResult.data);
    return NextResponse.json(
      {
        success: true,
        message: "Brand created successfully",
        data: result,
      },
      { status: ResponseStatus.CREATED },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateBrand = async (
  ctx: RouteContext<"/api/brands/[id]">,
  req: NextRequest,
) => {
  try {
    await verifyAdminAuth();

    const { id } = await ctx.params;
    const body = await req.json();
    const validationResult = brandUpdateSchemaType.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError(
        z.flattenError(validationResult.error).fieldErrors,
      );
    }

    const result = await BrandService.updateBrand(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Brand updated successful",
        data: result,
      },
      { status: ResponseStatus.ACCEPTED },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const deleteBrand = async (ctx: RouteContext<"/api/brands/[id]">) => {
  try {
    await verifyAdminAuth();

    const { id } = await ctx.params;
    const result = await BrandService.deleteBrand(id);

    return NextResponse.json(
      {
        success: true,
        message: "Brand deleted successful",
        data: result,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};
