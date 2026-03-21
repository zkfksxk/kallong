import z from 'zod';

export const dailOutfitSchema = z.object({
  name: z
    .string()
    .min(1, 'validation.nameRequired')
    .max(20, 'validation.nameMax'),
  description: z.string().max(500, 'validation.descriptionMax').optional(),
  selected_day: z.string().min(1, 'error.selectDate'),
});

export type DailyOutfitFormData = z.infer<typeof dailOutfitSchema>;
