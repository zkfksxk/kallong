const ALLOWED_PATTERN = /^[a-zA-Z가-힣0-9\s\-_]*$/;

export const validateInput = (
  value: string,
  maxLength: number
): string | null => {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return '입력값을 적어주세요.';
  }

  if (trimmed.length > maxLength) {
    return `${maxLength}자 이하로 입력해주세요.`;
  }

  if (!ALLOWED_PATTERN.test(value)) {
    return '영문, 한글, 숫자, 공백, 하이픈(-), 언더스코어(_)만 사용 가능합니다.';
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
