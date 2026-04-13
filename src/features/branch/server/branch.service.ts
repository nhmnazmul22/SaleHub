import { connectDB } from "@/config/database";
import {
  BranchType,
  BranchUpdateType,
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
    throw new NotFoundError("Branch not found");
  }

  // update
  return await BranchRepository.updateById(branchId, body);
};
