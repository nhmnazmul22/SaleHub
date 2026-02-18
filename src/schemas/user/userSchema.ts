import mongoose from "mongoose";
import { UserType } from "./userSchemaType";
import { RoleEnum } from "@/constants/enum";

const userSchema = new mongoose.Schema<UserType>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: RoleEnum,
      default: "staff",
    },
    branchId: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const UserModel = new mongoose.Model("users", userSchema);

export default UserModel;
