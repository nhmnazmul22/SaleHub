import { z } from "zod";

export const unitSchemaType = z.object({
  key: z.string("Unit key is required"),
  value: z.string("Unit Value is required"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type UnitType = z.infer<typeof unitSchemaType>;
