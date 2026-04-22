import { NextRequest, NextResponse } from "next/server";
import * as UserService from "@/features/user/server/user.service";
import ResponseStatus from "@/config/status";
import { handleError } from "@/helper/error.helper";
import z from "zod";
import { userSchemaType, userUpdateSchemaType } from "../shared/user.validation";
import { ValidationError } from "@/shared/errors/ValidationError";

export const getUsers = async () => {
  try {
    const users = await UserService.getAllUsers();
    return NextResponse.json(
      {
        success: true,
        message: "Users retrieved successful",
        data: users,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const createUser = async (req: Request) => {
  try {
    const body = await req.json();
    const validationResult = userSchemaType.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError(
        z.flattenError(validationResult.error).fieldErrors,
      );
    }

    const result = await UserService.createUser(validationResult.data);
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: result,
      },
      { status: ResponseStatus.CREATED },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateUserInfo = async (
  req: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) => {
  try {
    const { id } = await ctx.params;
    const body = await req.json();

    // validation
    const validationResult = userUpdateSchemaType.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError(z.flattenError(validationResult.error).fieldErrors);
    }

    const result = await UserService.updateUser(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "User updated successful",
        data: result,
      },
      { status: ResponseStatus.ACCEPTED },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const deleteUserInfo = async (
  req: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) => {
  try {
    const { id: userId } = await ctx.params;

    const deletedUser = await UserService.deleteUser(userId);

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successful",
        data: deletedUser,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getUserInfo = async (
  req: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) => {
  try {
    const { id: userId } = await ctx.params;

    const userInfo = await UserService.getUser(userId);

    return NextResponse.json(
      {
        success: true,
        message: "User retrieved successful",
        data: userInfo,
      },
      { status: ResponseStatus.SUCCESS },
    );
  } catch (error) {
    return handleError(error);
  }
};
