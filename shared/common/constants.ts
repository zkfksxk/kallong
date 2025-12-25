export const MAX_FILE_SIZE_MB = 4;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 4MB

export const SITE_CONFIG = {
  domain: 'https://what-to-wear-tomorrow.vercel.app/',
  thumbnail: 'images/thumbnail.png',
  title: '내일 뭐 입지?',
  description:
    '내일 뭐 입지? - 룩북 사진을 올리고 12시간 동안 투표를 진행해보세요',
  image_alt: '내일 뭐 입지?',
};

export const AUTH_FORM_RULES = {
  email: {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,}$/i,
      message: '이메일 형식이 아닙니다.',
    },
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d|(?=.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{8,}$/,
      message: '대소문자+숫자+특수문자 중 2가지 이상 포함해주세요.',
    },
    minLength: {
      value: 8,
      message: '8자 이상 입력해주세요.',
    },
    maxLength: {
      value: 30,
      message: '30자 이하로 입력해주세요.',
    },
  },
  nickname: {
    required: '닉네임을 입력해주세요.',
    minLength: {
      value: 1,
      message: '1자 이상 입력해주세요.',
    },
    maxLength: {
      value: 10,
      message: '10자 이하로 입력해주세요.',
    },
    pattern: {
      value: /^[a-zA-Z0-9가-힣]{1,10}$/,
      message: '대소문자, 한글, 숫자만 사용 가능합니다.',
    },
  },
};
