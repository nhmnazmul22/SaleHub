import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "categories", default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const CategoryModel = new mongoose.Model("categories", categorySchema);

export default CategoryModel;
