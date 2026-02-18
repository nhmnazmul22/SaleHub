import { RoleEnum } from "@/constants/enum";
import { z } from "zod";

export const userSchemaType = z.object({
  firstName: z.string("First name is required"),
  lastName: z.string().optional(),
  email: z.email(),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  role: z.enum(RoleEnum),
  branchId: z.string("Branch id is required"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type UserType = z.infer<typeof userSchemaType>;
