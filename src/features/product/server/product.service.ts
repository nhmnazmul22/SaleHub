import { connectDB } from "@/config/database";
import * as ProductRepository from "@/features/product/server/product.repository";
import { BusinessError } from "@/shared/errors/BusinessError";
import mongoose from "mongoose";
import { NotFoundError } from "@/shared/errors/NotfoundError";
import {
  ProductType,
  ProductUpdateType,
} from "@/features/product/shared/product.validation";
import { generateUniqueSlug } from "../shared/lib";
import ResponseStatus from "@/config/status";
import { ZodString } from "zod";

export const getProducts = async () => {
  await connectDB();
  const products = await ProductRepository.findAll({});
  return products;
};

export const createProduct = async (
  payload: ProductType,
  userId: ZodString,
) => {
  await connectDB();

  const newProductPayload = {
    ...payload,
    slug: await generateUniqueSlug(payload.name),
    createdBy: userId,
  };

  const newProduct = await ProductRepository.createOne(newProductPayload);

  if (!newProduct) {
    throw new BusinessError(
      "Failed to create product",
      ResponseStatus.INTERNAL_SERVER_ERROR,
    );
  }

  return newProduct;
};

export const updateProduct = async (
  productId: string,
  body: ProductUpdateType,
) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new BusinessError(
      "Please, provide valid product id for update product!",
    );
  }

  await connectDB();

  const existProduct = await ProductRepository.findById(productId);

  if (!existProduct) {
    throw new NotFoundError(`Product not found with id: ${productId}`);
  }

  if (body.slug) {
    const slug = await generateUniqueSlug(body.slug);
    body.slug = slug;
  }

  return await ProductRepository.updateById(productId, body);
};

export const deleteProduct = async (productId: string) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new BusinessError(
      "Please, provide valid product id for delete product!",
    );
  }

  await connectDB();

  const existProduct = await ProductRepository.findById(productId);
  if (!existProduct) {
    throw new NotFoundError(`Product not found with id: ${productId}`);
  }

  return await ProductRepository.deleteById(productId);
};

export const getProductById = async (productId: string) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new BusinessError(
      "Please, provide valid product id to get product info!",
    );
  }

  await connectDB();

  const existProduct = await ProductRepository.findById(productId);
  if (!existProduct) {
    throw new NotFoundError(`Product not found with id: ${productId}`);
  }

  return existProduct;
};
