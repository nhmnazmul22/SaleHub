import { connectDB } from "@/config/database";
import * as UserRepository from "@/features/user/server/user.repository";
import { UserType, UserUpdateType } from "../shared/user.validation";
import { BusinessError } from "@/shared/errors/BusinessError";
import ResponseStatus from "@/config/status";
import mongoose from "mongoose";
import { NotFoundError } from "@/shared/errors/NotfoundError";

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


export const updateUser = async (
  userId: string,
  body: UserUpdateType,
) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new BusinessError(
      "Please, provide valid user id for update user!",
    );
  }
  // check existence
  await connectDB();

  const existUser = await UserRepository.findById(userId);

  if (!existUser) {
    throw new NotFoundError(`User not found with id: ${userId}`);
  }

  // update
  return await UserRepository.updateById(userId, body);
};

export const deleteUser = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new BusinessError(
      "Please, provide valid user id for delete user!",
    );
  }

  await connectDB();

  const existUser = await UserRepository.findById(userId);
  if (!existUser) {
    throw new NotFoundError(`User not found with id: ${userId}`);
  }

  return await UserRepository.deleteById(userId);
};

export const getUser = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new BusinessError(
      "Please, provide valid user id to get user info!",
    );
  }

  await connectDB();

  const existUser = await UserRepository.findById(userId);
  if (!existUser) {
    throw new NotFoundError(`User not found with id: ${userId}`);
  }

  return existUser;
};
