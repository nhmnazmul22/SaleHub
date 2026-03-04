import { z } from "zod";

export const branchSchemaType = z.object({
  name: z.string("Branch name is required"),
  address: z.string("Branch address is required"),
  phone: z.string().optional(),
  email: z.email().optional(),
  contactPerson: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type BranchType = z.infer<typeof branchSchemaType>;
