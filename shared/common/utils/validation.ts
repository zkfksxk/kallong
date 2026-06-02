export type ValidationError =
  | { type: 'empty' }
  | { type: 'maxLength'; maxLength: number }
  | { type: 'invalidCharacters' };

const ALLOWED_PATTERN = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\s\-_]*$/;

export const validateInput = (
  value: string,
  maxLength: number
): ValidationError | null => {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return { type: 'empty' };
  }

  if (trimmed.length > maxLength) {
    return { type: 'maxLength', maxLength };
  }

  if (!ALLOWED_PATTERN.test(value)) {
    return { type: 'invalidCharacters' };
  }

  return null;
};
