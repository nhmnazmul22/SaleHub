import { objectId } from "@/types";
import { z } from "zod";
import { RoleEnumType } from "@/types/enumType";

export const userSchemaType = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().optional(),
    email: z.email().trim(),
    password: z
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must include uppercase, lowercase, number, special character, and be at least 8 characters long.",
      }),
    role: z.enum(Object.values(RoleEnumType), "Invalid Role"),
    branchId: objectId.optional(),
    isActive: z.boolean().default(true),
    lastLogin: z.date().nullable().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role !== "admin" && !data.branchId) {
      ctx.addIssue({
        code: "custom",
        message: "Branch ID is required for non-admin users",
        input: data.branchId,
        path: ["branchId"],
      });
    }
  });

export type UserType = z.infer<typeof userSchemaType>;
