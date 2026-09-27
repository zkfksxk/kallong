import z from 'zod';

const ALLOWED_PATTERN = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\s\-_]*$/;

export const lookbookSchema = z.object({
  voteName: z
    .string()
    .min(1, 'empty')
    .max(10, 'maxLength')
    .regex(ALLOWED_PATTERN, 'invalidCharacters'),
  firstName: z
    .string()
    .min(1, 'empty')
    .max(10, 'maxLength')
    .regex(ALLOWED_PATTERN, 'invalidCharacters'),
  secondName: z
    .string()
    .min(1, 'empty')
    .max(10, 'maxLength')
    .regex(ALLOWED_PATTERN, 'invalidCharacters'),
});

export type LookbookFormData = z.infer<typeof lookbookSchema>;
