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

/**
 * 개행 문자를 정규화하는 함수
 * \r\n, \r, \n을 모두 \n으로 통일하여 일관된 줄바꿈 처리
 * @param text 정규화할 텍스트
 * @returns 정규화된 텍스트
 */
export const normalizeLineBreaks = (text: string): string => {
  if (!text) return '';

  return text
    .replace(/\r\n/g, '\n') // Windows 개행 (\r\n)을 \n으로
    .replace(/\r/g, '\n') // Mac 개행 (\r)을 \n으로
    .replace(/\n{3,}/g, '\n\n'); // 3개 이상 연속된 개행을 2개로 제한
};
