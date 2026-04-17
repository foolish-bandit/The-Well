import { z } from 'zod';

/**
 * Minimal placeholder schema for a judge record.
 *
 * This will be superseded by the canonical schema under `data/schema/`
 * once the field catalogue stabilizes. Keep this file the source of
 * truth for what the site can render.
 */

export const SourceSchema = z.object({
  url: z.string().url().optional(),
  title: z.string().optional(),
  retrieved: z.string().optional(),
  excerpt: z.string().optional(),
  type: z.enum(['primary', 'secondary', 'observation']).default('primary'),
});
export type Source = z.infer<typeof SourceSchema>;

export const FactSchema = z.object({
  value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
  source: SourceSchema.optional(),
  notes: z.string().optional(),
});
export type Fact = z.infer<typeof FactSchema>;

export const StandingOrderSchema = z.object({
  title: z.string(),
  url: z.string().url().optional(),
  effective: z.string().optional(),
  summary: z.string().optional(),
});
export type StandingOrder = z.infer<typeof StandingOrderSchema>;

export const JudgeSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  jurisdiction: z.string().regex(/^[a-z0-9-]+$/),
  court: z.string(),
  name: z.string(),
  honorific: z.string().optional(),
  title: z.string().optional(),
  division: z.string().optional(),
  city: z.string().optional(),
  profile_url: z.string().url().optional(),
  appointed: z.string().optional(),
  status: z.enum(['active', 'senior', 'retired']).default('active'),
  updated: z.string().optional(),
  standing_orders: z.array(StandingOrderSchema).default([]),
  facts: z
    .object({
      filing: z.record(FactSchema).default({}),
      motions: z.record(FactSchema).default({}),
      oral_argument: z.record(FactSchema).default({}),
      technology: z.record(FactSchema).default({}),
      other: z.record(FactSchema).default({}),
    })
    .default({
      filing: {},
      motions: {},
      oral_argument: {},
      technology: {},
      other: {},
    }),
});

export type Judge = z.infer<typeof JudgeSchema>;
