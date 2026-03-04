import mongoose, { Schema } from "mongoose";
import { RoleEnum } from "@/constants/enum";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    role: {
      type: String,
      enum: RoleEnum,
      default: "staff",
    },
    branchId: { type: Schema.Types.ObjectId, ref: "branches" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const UserModel = new mongoose.Model("users", userSchema);

export default UserModel;
