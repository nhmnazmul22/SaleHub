import { Schema, model, models } from "mongoose";
import { SaleStatusEnumType } from "@/types/enumType";

const saleSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      trim: true,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },

    branchId: {
      type: Schema.Types.ObjectId,
      ref: "branches",
      required: true,
    },

    subTotal: {
      type: Number,
      default: 0,
    },

    grandTotal: {
      type: Number,
      default: 0,
    },

    totalDiscount: {
      type: Number,
      default: 0,
    },

    totalVat: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(SaleStatusEnumType),
      default: SaleStatusEnumType.COMPLETED,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    saleDate: {
      type: Date,
      default: Date.now,
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

saleSchema.index({ branchId: 1, saleDate: -1 });
saleSchema.index({ invoiceNumber: 1 }, { unique: true });
saleSchema.index({ customerId: 1 });

export const SaleModel = models.sales || model("sales", saleSchema);
