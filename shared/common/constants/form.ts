import z from 'zod';

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*(\d|[@$!%*?&]))[A-Za-z\d@$!%*?&]{8,}$/;

const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]{1,10}$/;

export const dailOutfitSchema = z.object({
  name: z
    .string()
    .min(1, 'validation.nameRequired')
    .max(20, 'validation.nameMax'),
  description: z.string().max(500, 'validation.descriptionMax').optional(),
  selected_day: z.string().min(1, 'error.selectDate'),
});

export type DailyOutfitFormData = z.infer<typeof dailOutfitSchema>;

// 로그인
export const signInSchema = z.object({
  email: z.email('auth.validation.emailInvalidPattern'),
  password: z
    .string()
    .min(1, 'auth.validation.passwordRequired')
    .min(8, 'auth.validation.passwordMin')
    .max(20, 'auth.validation.passwordMax')
    .regex(PASSWORD_REGEX, 'auth.validation.passwordInvaildPattern'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

//회원가입
export const signUpSchema = z
  .object({
    email: z.email('auth.validation.emailInvalidPattern'),
    password: z
      .string()
      .min(1, 'auth.validation.passwordRequired')
      .min(8, 'auth.validation.passwordMin')
      .max(20, 'auth.validation.passwordMax')
      .regex(PASSWORD_REGEX, 'auth.validation.passwordInvaildPattern'),
    passwordConfirmed: z
      .string()
      .min(1, 'auth.validation.passwordConfirmedRequired'),
    nickname: z
      .string()
      .min(1, 'auth.validation.nicknameRequired')
      .min(1, 'auth.validation.nicknameMin')
      .max(10, 'auth.validation.nicknameMax')
      .regex(NICKNAME_REGEX, 'auth.validation.nicknamInvalidPattern'),
    termsOfService: z.boolean().refine((v) => v === true, {
      message: 'auth.validation.termsRequired',
    }),
    privacyPolicy: z.boolean().refine((v) => v === true, {
      message: 'auth.validation.termsRequired',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmed, {
    message: 'auth.validation.passwordMismatch',
    path: ['passwordConfirmed'],
  });
export type SignUpFormData = z.infer<typeof signUpSchema>;

//닉네임 변경
export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(1, 'auth.validation.nicknameRequired')
    .min(1, 'auth.validation.nicknameMin')
    .max(10, 'auth.validation.nicknameMax')
    .regex(NICKNAME_REGEX, 'auth.validation.nicknamInvalidPattern'),
});

export type NicknameFormData = z.infer<typeof nicknameSchema>;

//비밀번호 초기화
export const resetPasswordSchema = z.object({
  email: z.email('auth.validation.emailInvalidPattern'),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'auth.validation.passwordRequired')
    .min(8, 'auth.validation.passwordMin')
    .max(20, 'auth.validation.passwordMax')
    .regex(PASSWORD_REGEX, 'auth.validation.passwordInvaildPattern'),
});

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
