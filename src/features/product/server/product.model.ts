import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      trim: true,
      index: true,
      unique: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },

    brandId: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },

    unitId: {
      type: Schema.Types.ObjectId,
      ref: "units",
      required: true,
    },

    description: {
      type: String,
    },

    imageUrl: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ProductModel = model("products", productSchema);

export default ProductModel;
