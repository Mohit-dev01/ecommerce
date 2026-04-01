import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  categoryId: z.string(),
});
