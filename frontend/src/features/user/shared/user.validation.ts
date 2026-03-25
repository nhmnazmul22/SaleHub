import {objectId} from "@/types";
import {z} from "zod";
import {RoleEnumType} from "@/types/enumType";

export const userSchemaType = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().optional(),
    email: z.email().trim(),
    password: z
        .string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    role: z.enum(Object.values(RoleEnumType), "Invalid Role"),
    branchId: objectId,
    isActive: z.boolean().default(true),
    lastLogin: z.date().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export type UserType = z.infer<typeof userSchemaType>;
