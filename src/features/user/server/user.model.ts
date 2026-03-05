import { Schema, model } from "mongoose";
import { RoleEnum } from "@/constants/enum";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    role: {
      type: String,
      enum: RoleEnum,
      default: "staff",
    },
    branchId: { type: Schema.Types.ObjectId, index: true, ref: "branches" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const UserModel = model("users", userSchema);

export default UserModel;
