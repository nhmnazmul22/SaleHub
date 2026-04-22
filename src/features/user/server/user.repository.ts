import UserModel from "@/features/user/server/user.model";
import { UserType } from "@/features/user/shared/user.validation";
import { Types } from "mongoose";

export const findAll = async (
  query?: Record<string, string>,
): Promise<UserType[] | []> => {
  return UserModel.find(query);
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<UserType | null> => {
  return await UserModel.findOne(query);
};

export const findById = async (
  id: string,
): Promise<UserType | null> => {
  return await UserModel.findOne({ _id: new Types.ObjectId(id) });
};

export const createOne = async (data: UserType): Promise<UserType> => {
  return await UserModel.create(data);
};
