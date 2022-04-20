import z from 'zod';

export const headerRequestSchema = z.object({
  articleCount: z.number(),
  edition: z.union([z.literal('UK'), z.literal('US'), z.literal('AU')]),
});
