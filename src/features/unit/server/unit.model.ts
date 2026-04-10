import { Schema, model, models } from "mongoose";

const unitSchema = new Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

unitSchema.index({ key: 1 }, { unique: true });

const UnitModel = models.unit || model("unit", unitSchema);

export default UnitModel;
