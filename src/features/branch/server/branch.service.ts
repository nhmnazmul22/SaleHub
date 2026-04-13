import { connectDB } from "@/config/database";
import {
  BranchType,
  BranchUpdateType,
  branchSchemaType,
  branchUpdateSchema,
} from "../shared/branch.validation";
import { ValidationError } from "@/shared/errors/ValidationError";
import { NotFoundError } from "@/shared/errors/NotfoundError";
import * as BranchRepository from "./branch.repository";

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
    throw new NotFoundError(
      `${payload.name} already exist. Try with another name.`,
    );
  }

  return await BranchRepository.createOne(payload);
};

export const updateBranch = async (
  branchId: string,
  body: BranchUpdateType,
) => {
  await connectDB();

  // validation
  const validationResult = branchUpdateSchema.safeParse(body);

  if (!validationResult.success) {
    throw new ValidationError(validationResult.error);
  }

  // check existence
  const existBranch = await BranchRepository.findById(branchId);

  if (!existBranch) {
    throw new NotFoundError(`Branch not found with id: ${branchId}`);
  }

  // update
  return await BranchRepository.updateById(branchId, body);
};

export const deleteBranch = async (branchId: string) => {
  await connectDB();

  if (!branchId) {
    throw new NotFoundError("Please, provide a branch id for delete branch!");
  }

  const existBranch = await BranchRepository.findById(branchId);
  if (!existBranch) {
    throw new NotFoundError(`Branch not found with id: ${branchId}`);
  }

  return await BranchRepository.deleteById(branchId);
};
