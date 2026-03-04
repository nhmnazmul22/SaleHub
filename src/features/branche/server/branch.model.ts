import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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

const BranchModel = new mongoose.Model("branches", branchSchema);

export default BranchModel;
