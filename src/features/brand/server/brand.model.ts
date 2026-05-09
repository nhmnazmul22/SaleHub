import { softDeletePlugin } from "@/plugin/softDelete.plugin";
import { Schema, model, models } from "mongoose";

const brandSchema = new Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

brandSchema.plugin(softDeletePlugin)

const BrandModel = models.brands ||  model("brands", brandSchema);

export default BrandModel;
