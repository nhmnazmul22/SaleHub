import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { handleError } from "@/helper/error.helper";
import {
  categorySchemaType,
  categoryUpdateSchemaType,
} from "@/features/category/shared/category.validation";
import { ValidationError } from "@/shared/errors/ValidationError";
import ResponseStatus from "@/config/status";
import { verifyAdminAuth } from "@/lib/verifyAuth";
import * as CategoryService from "@/features/category/server/category.service";

export const getCategories = async () => {
  try {
    // Check Authentication
    await verifyAdminAuth();

    const categories = await CategoryService.getCategories();
    return NextResponse.json(
      {
        success: true,
        message: "Categories retrieved successful",
        data: categories,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const createCategory = async (req: NextRequest) => {
  try {
    // Check Authentication
    await verifyAdminAuth();

    const body = await req.json();
    const validationResult = categorySchemaType.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError(
        z.flattenError(validationResult.error).fieldErrors,
      );
    }

    const result = await CategoryService.createCategory(validationResult.data);
    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: result,
      },
      { status: ResponseStatus.CREATED },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getCategoryById = async (
  ctx: RouteContext<"/api/categories/[id]">,
) => {
  try {
    // Check admin Authentication
    await verifyAdminAuth();

    const { id } = await ctx.params;

    const category = await CategoryService.getCategory(id);

    return NextResponse.json(
      {
        success: true,
        message: "Category retrieved successful",
        data: category,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateCategory = async (
  ctx: RouteContext<"/api/categories/[id]">,
  req: NextRequest,
) => {
  try {
    // Check Authentication
    await verifyAdminAuth();

    const { id } = await ctx.params;
    const body = await req.json();

    // validation
    const validationResult = categoryUpdateSchemaType.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError(
        z.flattenError(validationResult.error).fieldErrors,
      );
    }

    const result = await CategoryService.updateCategory(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Category updated successful",
        data: result,
      },
      { status: ResponseStatus.ACCEPTED },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const deleteCategory = async (
  ctx: RouteContext<"/api/categories/[id]">,
) => {
  try {
    // Check Authentication
    await verifyAdminAuth();

    const { id } = await ctx.params;

    const deletedUser = await CategoryService.deleteCategory(id);

    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successful",
        data: deletedUser,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};
