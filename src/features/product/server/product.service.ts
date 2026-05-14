import { connectDB } from "@/config/database";
import * as ProductRepository from "@/features/product/server/product.repository";
import { BusinessError } from "@/shared/errors/BusinessError";
import mongoose from "mongoose";
import { NotFoundError } from "@/shared/errors/NotfoundError";
import { generateUniqueSlug, uploadImageHelper } from "../shared/lib";
import { UploadResponse } from "@/types";
import { ProductInputType, ProductUpdateType } from "../shared/type";
import { ZodString } from "zod";

export const getProducts = async () => {
  await connectDB();
  const products = await ProductRepository.findAll({});
  return products;
};

export const createProduct = async (
  payload: ProductInputType,
  userId: string,
) => {
  // Handling image upload
  let imageUploadResult = null;
  let imagesUploadResult: UploadResponse[] | [] = [];

  if (payload.image) {
    imageUploadResult = (await uploadImageHelper(
      payload.image,
      "products",
    )) as UploadResponse;
  }

  if (payload.images) {
    imagesUploadResult = (await uploadImageHelper(
      payload.images,
      "products",
    )) as UploadResponse[];
  }

  const imageUploadFail = imagesUploadResult.find((upload) => !upload.success);
  if (!imageUploadResult?.success || imageUploadFail) {
    throw new BusinessError(
      `Image Upload Error: ${imageUploadResult?.error ?? imageUploadFail?.error}`,
    );
  }

  // Product creating
  await connectDB();
  const newProductPayload = {
    ...payload,
    imageUrl: imageUploadResult?.url ?? null,
    images: imagesUploadResult
      ?.map((image) => image.url)
      .filter((url): url is string => Boolean(url)),
    slug: await generateUniqueSlug(payload.name),
    createdBy: userId,
  };

  delete newProductPayload.image;

  // const newProduct = await ProductRepository.createOne(newProductPayload);
  return newProductPayload;
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
