import { Types, UpdateWriteOpResult } from "mongoose";
import ProductModel from "./product.model";
import { ProductType, ProductUpdateType } from "../shared/product.validation";

type ProductDocument = ProductType & {
  _id: Types.ObjectId;
};

export const findAll = async (
  query?: Record<string, unknown>,
): Promise<ProductType[] | []> => {
  return ProductModel.find(query || {});
};

export const findOneByQuery = async (
  query?: Record<string, unknown>,
): Promise<ProductDocument | null> => {
  return ProductModel.findOne(query);
};

export const findById = async (id: string): Promise<ProductDocument | null> => {
  return ProductModel.findOne({ _id: new Types.ObjectId(id) });
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
