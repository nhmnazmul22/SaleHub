import { Schema, model, models } from "mongoose";
import { RoleEnumType } from "@/types/enumType";

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
      enum: Object.values(RoleEnumType),
      default: "staff",
    },
    branchId: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "branches",
      required: function (this: { role: string }) {
        return this.role !== "admin";
      },
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const UserModel = models.users || model("users", userSchema);

export default UserModel;
