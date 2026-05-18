import { connectDB } from "@/config/database";
import * as ProductRepository from "@/features/product/server/product.repository";
import { BusinessError } from "@/shared/errors/BusinessError";
import mongoose from "mongoose";
import { NotFoundError } from "@/shared/errors/NotfoundError";
import { generateUniqueSlug, uploadImageHelper } from "../shared/lib";
import { UploadResponse } from "@/types";
import { ImageType, ProductInputType, ProductType } from "../shared/type";
import { deleteImage } from "@/lib/uploadFile";

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
    image: {
      url: imageUploadResult?.url ?? null,
      publicId: imageUploadResult?.publicId ?? null,
    },
    images: imagesUploadResult
      ?.map((image) => ({
        url: image.url ?? null,
        publicId: image.publicId ?? null,
      }))
      .filter((image): image is ImageType => Boolean(image.url)),
    slug: await generateUniqueSlug(payload.name),
    createdBy: userId,
  };

  const newProduct = await ProductRepository.createOne(newProductPayload);
  return newProduct;
};

export const updateProduct = async (
  productId: string,
  payload: Partial<ProductInputType>,
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

  const productUpdateInfo = { ...payload } as Partial<ProductType>;

  if (payload.image || payload.images?.length) {
    // Handle images update
    let imageUploadResult = null;
    let imagesUploadResult: UploadResponse[] | [] = [];

    if (payload.image) {
      imageUploadResult = (await uploadImageHelper(
        payload.image,
        "products",
      )) as UploadResponse;

      if (imageUploadResult.success && imageUploadResult.publicId) {
        await deleteImage(imageUploadResult.publicId);
      }
    }

    if (payload.images) {
      imagesUploadResult = (await uploadImageHelper(
        payload.images,
        "products",
      )) as UploadResponse[];

      imagesUploadResult.forEach(async (image) => {
        if (image.success && image.publicId) {
          await deleteImage(image.publicId);
        }
      });
    }

    const imageUploadFail = imagesUploadResult.find(
      (upload) => !upload.success,
    );
    if (!imageUploadResult?.success || imageUploadFail) {
      throw new BusinessError(
        `Image Upload Error: ${imageUploadResult?.error ?? imageUploadFail?.error}`,
      );
    }
    productUpdateInfo.image = {
      url: imageUploadResult?.url ?? null,
      publicId: imageUploadResult?.publicId ?? null,
    };
    productUpdateInfo.images = imagesUploadResult
      ?.map((image) => ({
        url: image.url ?? null,
        publicId: image.publicId ?? null,
      }))
      .filter((image): image is ImageType => Boolean(image.url));
  }

  if (productUpdateInfo.slug) {
    const slug = await generateUniqueSlug(productUpdateInfo.slug);
    productUpdateInfo.slug = slug;
  }

  return await ProductRepository.updateById(productId, productUpdateInfo);
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
