import { connectDB } from "@/config/database";
import {
  BranchType,
  BranchUpdateType,
  branchSchemaType,
  branchUpdateSchema,
} from "@/features/branch/shared/branch.validation";
import { ValidationError } from "@/shared/errors/ValidationError";
import { NotFoundError } from "@/shared/errors/NotfoundError";
import * as BranchRepository from "@/features/branch/server/branch.repository";
import { BusinessError } from "@/shared/errors/BusinessError";
import mongoose from "mongoose";

export const getAllBranch = async (): Promise<BranchType[] | []> => {
  await connectDB();
  const branches = await BranchRepository.findAll();
  return branches;
};

export const createBranch = async (data: BranchType): Promise<BranchType> => {
  await connectDB();
  const validationResult = branchSchemaType.safeParse(data);

  if (!validationResult.success) {
    throw new ValidationError(validationResult.error);
  }

  const payload = validationResult.data;

  // Checking branch exist or not
  const existBranch = await BranchRepository.findOneByQuery({
    name: payload.name,
  });

  if (existBranch) {
    throw new BusinessError(
      `${payload.name} already exist. Try with another name.`,
    );
  }

  return await BranchRepository.createOne(payload);
};

export const updateBranch = async (
  branchId: string,
  body: BranchUpdateType,
) => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new BusinessError(
      "Please, provide valid branch id for delete branch!",
    );
  }

  // validation
  const validationResult = branchUpdateSchema.safeParse(body);

  if (!validationResult.success) {
    throw new ValidationError(validationResult.error);
  }

  // check existence
  await connectDB();

  const existBranch = await BranchRepository.findById(branchId);

  if (!existBranch) {
    throw new NotFoundError(`Branch not found with id: ${branchId}`);
  }

  // update
  return await BranchRepository.updateById(branchId, body);
};

export const deleteBranch = async (branchId: string) => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new BusinessError(
      "Please, provide valid branch id for delete branch!",
    );
  }

  await connectDB();

  const existBranch = await BranchRepository.findById(branchId);
  if (!existBranch) {
    throw new NotFoundError(`Branch not found with id: ${branchId}`);
  }

  return await BranchRepository.deleteById(branchId);
};

export const getBranch = async (branchId: string) => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new BusinessError(
      "Please, provide valid branch id to get branch info!",
    );
  }

  await connectDB();

  const existBranch = await BranchRepository.findById(branchId);
  if (!existBranch) {
    throw new NotFoundError(`Branch not found with id: ${branchId}`);
  }

  return existBranch;
};
