import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const BrandModel = new mongoose.Model("brands", brandSchema);

export default BrandModel;
