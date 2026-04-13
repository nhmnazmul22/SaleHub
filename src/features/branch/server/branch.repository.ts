import { Schema, UpdateWriteOpResult } from "mongoose";
import {
  BranchType,
  BranchUpdateType,
} from "@/features/branch/shared/branch.validation";
import BranchModel from "@/features/branch/server/branch.model";

export const findAll = async (
  query?: Record<keyof BranchType, string>,
): Promise<BranchType[] | []> => {
  return await BranchModel.find(query);
};

export const findById = async (
  id: string,
): Promise<BranchUpdateType | null> => {
  return await BranchModel.findOne({ _id: new Schema.ObjectId(id) });
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
