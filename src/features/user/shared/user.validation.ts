import { RoleEnum } from "@/constants/enum";
import { objectId } from "@/types";
import { z } from "zod";

export const userSchemaType = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().optional(),
  email: z.email().trim(),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  role: z.enum(RoleEnum, "Invalid Role"),
  branchId: objectId,
  isActive: z.boolean().default(true),
  lastLogin: z.date().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type UserType = z.infer<typeof userSchemaType>;
