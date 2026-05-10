import { VatDiscountEnumType } from "@/types/enumType";
import { Schema, model, models } from "mongoose";

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

    basePrice: {
      type: Number,
      default: 0,
    },

    baseShippingAmount: {
      type: Number,
      default: 0,
    },

    discountEnabled: {
      type: Boolean,
      default: false,
    },

    discountType: {
      type: String,
      enum: Object.values(VatDiscountEnumType),
      default: "fixed",
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    vatEnabled: {
      type: Boolean,
      default: false,
    },

    vatType: {
      type: String,
      enum: Object.values(VatDiscountEnumType),
      default: "fixed",
    },

    vatAmount: {
      type: Number,
      default: 0,
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

const ProductModel = models.products || model("products", productSchema);

export default ProductModel;
