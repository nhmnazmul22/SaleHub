import { Schema, model, models } from "mongoose";
import { boolean } from "zod";

const brandSchema = new Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, default: null },
    isActive: { type: boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const BrandModel = models.brands ||  model("brands", brandSchema);

export default BrandModel;
