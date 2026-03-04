import { RoleEnum } from "@/constants/enum";
import { Schema } from "mongoose";
import { z } from "zod";

export const userSchemaType = z.object({
  firstName: z.string("First name is required"),
  lastName: z.string().optional(),
  email: z.email(),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  role: z.enum(RoleEnum),
  branchId: z.instanceof(Schema.Types.ObjectId),
  isActive: z.boolean().default(true),
  lastLogin: z.date().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type UserType = z.infer<typeof userSchemaType>;
