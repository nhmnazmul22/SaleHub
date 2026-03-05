import { VatDiscountEnums } from "@/constants/enum";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productVariantSchema = new Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    purchasePrice: {
      type: Number,
      default: 0,
    },

    unitPrice: {
      type: Number,
      default: 0,
    },

    sellPrice: {
      type: Number,
      default: 0,
    },

    lastUnitPrice: {
      type: Number,
      default: 0,
    },

    shippingAmount: {
      type: Number,
      default: 0,
    },

    discountEnabled: {
      type: Boolean,
      default: false,
    },

    discountType: {
      type: String,
      enum: VatDiscountEnums,
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
      enum: VatDiscountEnums,
      default: "fixed",
    },

    vatAmount: {
      type: Number,
      default: 0,
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

const ProductVariantModel = model("product_variants", productVariantSchema);

export default ProductVariantModel;
