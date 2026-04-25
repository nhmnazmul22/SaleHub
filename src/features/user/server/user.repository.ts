import UserModel from "@/features/user/server/user.model";
import {
  UserType,
  UserUpdateType,
} from "@/features/user/shared/user.validation";
import { Types, UpdateWriteOpResult } from "mongoose";

export const findAll = async (
  query?: Record<string, string>,
): Promise<UserType[] | []> => {
  return UserModel.find(query);
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<UserType | null> => {
  return UserModel.findOne(query);
};

export const findById = async (id: string): Promise<UserType | null> => {
  return UserModel.findOne({_id: new Types.ObjectId(id)});
};

export const createOne = async (data: UserType): Promise<UserType> => {
  return await UserModel.create(data);
};

export const updateById = async (
  id: string,
  data: UserUpdateType,
): Promise<UpdateWriteOpResult> => {
  return UserModel.updateOne(
      {_id: new Types.ObjectId(id)},
      {$set: data},
  );
};

export const deleteById = async (id: string) => {
  return UserModel.deleteOne({_id: new Types.ObjectId(id)});
};
