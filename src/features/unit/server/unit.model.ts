import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UnitModel = new mongoose.Model("units", unitSchema);

export default UnitModel;
