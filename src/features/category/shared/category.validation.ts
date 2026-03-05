import { objectId } from "@/types";
import { z } from "zod";

export const categorySchemaType = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  parentId: objectId.optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type CategoryType = z.infer<typeof categorySchemaType>;
