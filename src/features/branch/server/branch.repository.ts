import { Schema, UpdateWriteOpResult } from "mongoose";
import {
  BranchType,
  BranchUpdateType,
} from "@/features/branch/shared/branch.validation";
import BranchModel from "@/features/branch/server/branch.model";

export const findByQuery = async (
  query?: Record<string, string>,
): Promise<BranchType[] | []> => {
  return await BranchModel.find(query);
};

export const findById = async (
  id: string,
): Promise<BranchUpdateType | null> => {
  return await BranchModel.findOne({ _id: new Schema.ObjectId(id) });
};

export const createOne = async (data: BranchType): Promise<BranchType> => {
  return await BranchModel.create(data);
};

export const updateById = async (
  id: string,
  data: BranchUpdateType,
): Promise<UpdateWriteOpResult> => {
  return await BranchModel.updateOne(
    { _id: new Schema.ObjectId(id) },
    { $set: data },
  );
};

export const deleteById = async (id: string) => {
  return await BranchModel.deleteOne({ _id: new Schema.ObjectId(id) });
};
