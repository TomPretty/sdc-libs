import z from 'zod';

export const headerRequestSchema = z.object({
  edition: z.union([z.literal('UK'), z.literal('US'), z.literal('AU')]),
});

export const bannerRequestSchema = z.object({
  articleCount: z.number(),
  edition: z.union([z.literal('UK'), z.literal('US'), z.literal('AU')]),
});
