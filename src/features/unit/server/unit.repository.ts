import { Types, UpdateWriteOpResult } from "mongoose";
import UnitModel from "./unit.model";
import { UnitType, UnitUpdateType } from "../shared/unit.validation";

export const findAll = async (
  query?: Record<string, string>,
): Promise<UnitType[] | []> => {
  return UnitModel.find(query || {});
};

export const findOneByQuery = async (
  query?: Record<string, string>,
): Promise<UnitType | null> => {
  return UnitModel.findOne(query);
};

export const findById = async (id: string): Promise<UnitType | null> => {
  return UnitModel.findOne({ _id: new Types.ObjectId(id) });
};

export const createOne = async (data: UnitType): Promise<UnitType> => {
  return await UnitModel.create(data);
};

export const updateById = async (
  id: string,
  data: Partial<UnitUpdateType>,
): Promise<UpdateWriteOpResult> => {
  return UnitModel.updateOne({ _id: new Types.ObjectId(id) }, { $set: data });
};

export const deleteById = async (id: string) => {
  return UnitModel.deleteOne({ _id: new Types.ObjectId(id) });
};
