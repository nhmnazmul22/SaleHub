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

export type BranchType = z.infer<typeof branchSchemaType>;
