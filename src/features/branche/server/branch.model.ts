import { Schema, model } from "mongoose";

const branchSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: false, default: null },
    email: { type: String, required: false, default: null },
    contactPerson: { type: String, required: false, default: null },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const BranchModel = model("branches", branchSchema);

export default BranchModel;
