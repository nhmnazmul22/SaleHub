import { connectDB } from "@/config/database";
import * as BrandRepository from "@/features/brand/server/brand.repository";
import { BusinessError } from "@/shared/errors/BusinessError";
import ResponseStatus from "@/config/status";
import mongoose from "mongoose";
import { NotFoundError } from "@/shared/errors/NotfoundError";
import {
  BrandType,
  BrandUpdateType,
} from "@/features/brand/shared/brand.validation";

export const getBrands = async () => {
  await connectDB();
  const brands = await BrandRepository.findAll({});
  return brands;
};

export const createBrand = async (payload: BrandType) => {
  await connectDB();

  const existingBrand: BrandType | null = await BrandRepository.findOneByQuery({
    name: payload.name,
  });

  if (existingBrand) {
    throw new BusinessError("Brand already exists with this name!");
  }

  const newBrand = await BrandRepository.createOne(payload);

  if (!newBrand) {
    throw new BusinessError(
      "Failed to create brand",
      ResponseStatus.INTERNAL_SERVER_ERROR,
    );
  }

  return newBrand;
};

export const updateBrand = async (brandId: string, body: BrandUpdateType) => {
  if (!mongoose.Types.ObjectId.isValid(brandId)) {
    throw new BusinessError("Please, provide valid brand id for update brand!");
  }

  await connectDB();

  const existBrand = await BrandRepository.findById(brandId);

  if (!existBrand) {
    throw new NotFoundError(`Brand not found with id: ${brandId}`);
  }

  return await BrandRepository.updateById(brandId, body);
};

export const deleteBrand = async (brandId: string) => {
  if (!mongoose.Types.ObjectId.isValid(brandId)) {
    throw new BusinessError("Please, provide valid brand id for delete brand!");
  }

  await connectDB();

  const existBrand = await BrandRepository.findById(brandId);
  if (!existBrand) {
    throw new NotFoundError(`Brand not found with id: ${brandId}`);
  }

  return await BrandRepository.deleteById(brandId);
};

export const getBrandById = async (brandId: string) => {
  if (!mongoose.Types.ObjectId.isValid(brandId)) {
    throw new BusinessError(
      "Please, provide valid brand id to get brand info!",
    );
  }

  await connectDB();

  const existBrand = await BrandRepository.findById(brandId);
  if (!existBrand) {
    throw new NotFoundError(`Brand not found with id: ${brandId}`);
  }

  return existBrand;
};
