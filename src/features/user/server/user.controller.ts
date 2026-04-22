import { NextResponse } from "next/server";
import * as UserService from "@/features/user/server/user.service";
import ResponseStatus from "@/config/status";
import { handleError } from "@/helper/error.helper";
import z from "zod";
import { userSchemaType } from "../shared/user.validation";
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
