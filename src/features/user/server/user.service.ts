import { connectDB } from "@/config/database";
import * as UserRepository from "@/features/user/server/user.repository";
import { UserType } from "../shared/user.validation";
import { BusinessError } from "@/shared/errors/BusinessError";
import ResponseStatus from "@/config/status";

export const getAllUsers = async () => {
  await connectDB();
  const users = await UserRepository.findAll();
  return users;
};

export const createUser = async (payload: UserType) => {
  await connectDB();

  // Checking if the email already exists
  const existingUser = await UserRepository.findOneByQuery({
    email: payload.email,
  });

  if (existingUser) {
    throw new BusinessError("User already exists with this email");
  }

  // If validation is successful and email is unique, create the user
  const newUser = await UserRepository.createOne(payload);

  if (!newUser) {
    throw new BusinessError("Failed to create user", ResponseStatus.INTERNAL_SERVER_ERROR);
  }

  return newUser;
};
