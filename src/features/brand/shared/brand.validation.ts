import { z } from "zod";

export const brandSchemaType = z.object({
  name: z.string().trim().min(1, "Brand name is required"),
  shortName: z.string().trim().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export type BrandType = z.infer<typeof brandSchemaType>;
