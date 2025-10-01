import { z } from "zod";

// Schema for stats
export const ProductsPerCategorySchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  productCount: z.number().int().min(0),
});

export const PriceStatsSchema = z.object({
  min: z.number().min(0),
  max: z.number().min(0),
  average: z.number().min(0),
});

export const StatsResponseSchema = z.object({
  totalCategories: z.number().int().min(0),
  totalProducts: z.number().int().min(0),
  productsPerCategory: z.array(ProductsPerCategorySchema),
  priceStats: PriceStatsSchema,
  lastUpdated: z.string().datetime(),
});

// Brief items schema
export const ItemBriefSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const ItemsResponseSchema = z.object({
  brandOptions: z.array(ItemBriefSchema),
  productOptions: z.array(ItemBriefSchema),
  categoryOptions: z.array(ItemBriefSchema),
});

// Error schema
export const StatsErrorResponseSchema = z.object({
  error: z.string(),
});

// Combined API response types
export const StatsApiResponseSchema = z.union([StatsResponseSchema, StatsErrorResponseSchema]);

// TypeScript types
export type StatsResponse = z.infer<typeof StatsResponseSchema>;
export type ItemsResponse = z.infer<typeof ItemsResponseSchema>;
export type StatsErrorResponse = z.infer<typeof StatsErrorResponseSchema>;
export type StatsApiResponse = z.infer<typeof StatsApiResponseSchema>;
