export const MAX_FILE_SIZE_MB = 4;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 4MB

export const COMPRESSION_OPTIONS = {
  maxSizeMB: 4,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const SITE_CONFIG = {
  domain: 'https://what-to-wear-tomorrow.vercel.app/',
  thumbnail: 'images/thumbnail.png',
  title: '내일 뭐 입지?',
  description:
    '내일 뭐 입지? - 룩북 사진을 올리고 12시간 동안 투표를 진행해보세요',
  image_alt: '내일 뭐 입지?',
};

export const LANGUAGES = [
  { label: 'english', value: 'en' },
  { label: 'korean', value: 'ko' },
];

export const THEME = ['light', 'dark', 'system'];
