import { connectDB } from "@/config/database";
import * as ProductRepository from "@/features/product/server/product.repository";
import { BusinessError } from "@/shared/errors/BusinessError";
import ResponseStatus from "@/config/status";
import mongoose from "mongoose";
import { NotFoundError } from "@/shared/errors/NotfoundError";
import {
  ProductType,
  ProductUpdateType,
} from "@/features/product/shared/product.validation";

export const getProducts = async () => {
  await connectDB();
  const products = await ProductRepository.findAll({});
  return products;
};

export const createProduct = async (payload: ProductType) => {
  await connectDB();

  const existingProduct = await ProductRepository.findOneByQuery({
    slug: payload.slug,
  });

  if (existingProduct) {
    throw new BusinessError("Product already exists with this slug!");
  }

  const newProduct = await ProductRepository.createOne(payload);

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
    const slugOwner = await ProductRepository.findOneByQuery({
      slug: body.slug,
    });

    if (slugOwner && slugOwner._id.toString() !== productId) {
      throw new BusinessError("Another product already uses this slug!");
    }
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
