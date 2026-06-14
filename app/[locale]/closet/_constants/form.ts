import z from 'zod';

export const dailyOutfitSchema = z.object({
  name: z
    .string()
    .min(1, 'Closet.validation.nameRequired')
    .max(20, 'Closet.validation.nameMax'),
  description: z
    .string()
    .max(500, 'Closet.validation.descriptionMax')
    .optional(),
  selected_day: z.string().min(1, 'Closet.validation.dateRequired'),
});

export type DailyOutfitFormData = z.infer<typeof dailyOutfitSchema>;
