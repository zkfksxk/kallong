import { ValidationError } from './types';

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

export const timeCalc = (createdAt: string) => {
  const created = new Date(createdAt);
  const now = new Date();

  // 경과 시간(ms)
  const diffMs = now.getTime() - created.getTime();

  // 기준 시간 (12시간)
  const totalAllowedMs = 12 * 60 * 60 * 1000;
  const remainingMs = Math.max(totalAllowedMs - diffMs, 0); // 0 이하로는 내려가지 않게

  const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingMinutes = Math.floor(
    (remainingMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  const pad = (num: number) => String(num).padStart(2, '0');

  // HH:MM 형태로 반환
  return `${pad(remainingHours)}:${pad(remainingMinutes)}`;
};

export function getDaysSince(createdAt: string): number {
  const created = new Date(createdAt);
  const today = new Date();

  // 시간 차이를 일로 변환
  const diffTime = today.getTime() - created.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export const base64ToFile = (
  base64: string,
  filename = 'rembg_image.png',
  mimeType = 'image/png'
) => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};
