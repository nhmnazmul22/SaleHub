import { z } from "zod";

export const branchSchemaType = z.object({
  name: z.string().trim().min(1, "Branch name is required"),
  address: z.string().trim().min(1, "Branch address is required"),
  phone: z.string().trim().optional(),
  email: z.email().trim().optional(),
  contactPerson: z.string().trim().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export const branchUpdateSchema = z
  .object({
    name: z.string().trim().optional(),
    address: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    email: z.email().trim().optional(),
    contactPerson: z.string().trim().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    error: "At least one field must be provide for update",
    abort: true,
  });

export type BranchType = z.infer<typeof branchSchemaType>;
