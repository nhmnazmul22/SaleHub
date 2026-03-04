import { Schema } from "mongoose";
import { z } from "zod";

export const categorySchemaType = z.object({
  name: z.string("Category name required"),
  parentId: z.instanceof(Schema.Types.ObjectId).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type CategoryType = z.infer<typeof categorySchemaType>;
