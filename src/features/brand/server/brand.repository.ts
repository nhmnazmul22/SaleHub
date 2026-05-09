import { Types, UpdateWriteOpResult } from "mongoose";
import BrandModel from "./brand.model";
import { BrandType, BrandUpdateType } from "../shared/brand.validation";

export const findAll = async (
  query?: Record<string, string>,
): Promise<BrandType[] | []> => {
  return BrandModel.find(query || {});
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<BrandType | null> => {
  return BrandModel.findOne(query);
};

export const findById = async (id: string): Promise<BrandType | null> => {
  return BrandModel.findOne({ _id: new Types.ObjectId(id) });
};

export const createOne = async (data: BrandType): Promise<BrandType> => {
  return await BrandModel.create(data);
};

export const updateById = async (
  id: string,
  data: Partial<BrandUpdateType>,
): Promise<UpdateWriteOpResult> => {
  return BrandModel.updateOne({ _id: new Types.ObjectId(id) }, { $set: data });
};

export const deleteById = async (id: string) => {
  return BrandModel.deleteOne({ _id: new Types.ObjectId(id) });
};
