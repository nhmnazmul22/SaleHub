import { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    parentId: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "categories",
      default: null,
    },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const CategoryModel = models.categories || model("categories", categorySchema);

export default CategoryModel;
