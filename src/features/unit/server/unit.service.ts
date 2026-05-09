import { connectDB } from "@/config/database";
import * as UnitRepository from "@/features/unit/server/unit.repository";
import { BusinessError } from "@/shared/errors/BusinessError";
import ResponseStatus from "@/config/status";
import mongoose from "mongoose";
import { NotFoundError } from "@/shared/errors/NotfoundError";
import {
  UnitType,
  UnitUpdateType,
} from "@/features/unit/shared/unit.validation";

export const getUnits = async () => {
  await connectDB();
  const units = await UnitRepository.findAll({});
  return units;
};

export const createUnit = async (payload: UnitType) => {
  await connectDB();

  // Checking if the unit already exists
  const existingUnit: UnitType | null = await UnitRepository.findOneByQuery({
    key: payload.key,
    value: payload.value,
  });

  if (existingUnit) {
    throw new BusinessError("Unit already exists with this key and value!");
  }

  // If validation is successful and name is unique, create the unit
  const newUnit = await UnitRepository.createOne(payload);

  if (!newUnit) {
    throw new BusinessError(
      "Failed to create unit",
      ResponseStatus.INTERNAL_SERVER_ERROR,
    );
  }

  return newUnit;
};

export const updateUnit = async (UnitId: string, body: UnitUpdateType) => {
  if (!mongoose.Types.ObjectId.isValid(UnitId)) {
    throw new BusinessError("Please, provide valid unit id for update unit!");
  }
  // check existence
  await connectDB();

  const existUnit = await UnitRepository.findById(UnitId);

  if (!existUnit) {
    throw new NotFoundError(`Unit not found with id: ${UnitId}`);
  }

  // update
  return await UnitRepository.updateById(UnitId, body);
};

export const deleteUnit = async (UnitId: string) => {
  if (!mongoose.Types.ObjectId.isValid(UnitId)) {
    throw new BusinessError("Please, provide valid unit id for delete unit!");
  }

  await connectDB();

  const existUnit = await UnitRepository.findById(UnitId);
  if (!existUnit) {
    throw new NotFoundError(`Unit not found with id: ${UnitId}`);
  }

  return await UnitRepository.deleteById(UnitId);
};

export const getUnitById = async (UnitId: string) => {
  if (!mongoose.Types.ObjectId.isValid(UnitId)) {
    throw new BusinessError("Please, provide valid unit id to get unit info!");
  }

  await connectDB();

  const existUnit = await UnitRepository.findById(UnitId);
  if (!existUnit) {
    throw new NotFoundError(`Unit not found with id: ${UnitId}`);
  }

  return existUnit;
};
