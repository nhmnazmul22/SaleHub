import { z } from "zod";

export const unitSchemaType = z.object({
  key: z.string().trim().min(1, "Unit key is required"),
  value: z.string().trim().min(1, "Unit Value is required"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export const unitUpdateSchemaType = z.object({
  key: z.string().trim().optional(),
  value: z.string().trim().optional(),
  deletedAt: z.date().optional(),
});

export type UnitType = z.infer<typeof unitSchemaType>;
export type UnitUpdateType = z.infer<typeof unitUpdateSchemaType>;
