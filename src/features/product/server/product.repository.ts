import { Types, UpdateWriteOpResult } from "mongoose";
import ProductModel from "./product.model";
import {
  ProductType,
  ProductUpdateType,
  ProductResponseType,
} from "../shared/type";
import { productPipeline } from "./product.pipeline";

type ProductDocument = ProductType & {
  _id: Types.ObjectId;
};

export const findAll = async (
  query?: Record<string, unknown>,
): Promise<ProductResponseType[] | []> => {
  return ProductModel.aggregate(productPipeline(query));
};

export const findOneByQuery = async (
  query?: Record<string, unknown>,
): Promise<ProductDocument | null> => {
  return ProductModel.findOne(query);
};

export const findById = async (
  id: string,
): Promise<ProductResponseType | null> => {
  const [product] = await ProductModel.aggregate(
    productPipeline({ _id: new Types.ObjectId(id) }),
  );
  return product ?? null;
};

export const createOne = async (data: ProductType): Promise<ProductType> => {
  return await ProductModel.create(data);
};

export const updateById = async (
  id: string,
  data: Partial<ProductUpdateType>,
): Promise<UpdateWriteOpResult> => {
  return ProductModel.updateOne(
    { _id: new Types.ObjectId(id) },
    { $set: data },
  );
};

export const deleteById = async (id: string) => {
  return ProductModel.deleteOne({ _id: new Types.ObjectId(id) });
};
