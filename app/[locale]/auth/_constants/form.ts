import z from 'zod';

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*(\d|[@$!%*?&]))[A-Za-z\d@$!%*?&]{8,}$/;

const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]{1,10}$/;

// 로그인
export const signInSchema = z.object({
  email: z.email('Auth.validation.emailInvalidPattern'),
  password: z
    .string()
    .refine((value) => value.trim().length > 0, {
      message: 'Auth.validation.passwordRequired',
    })
    .min(8, 'Auth.validation.passwordMin')
    .max(20, 'Auth.validation.passwordMax')
    .regex(PASSWORD_REGEX, 'Auth.validation.passwordInvalidPattern'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

//회원가입
export const signUpSchema = z
  .object({
    email: z.email('Auth.validation.emailInvalidPattern'),
    password: z
      .string()
      .refine((value) => value.trim().length > 0, {
        message: 'Auth.validation.passwordRequired',
      })
      .min(8, 'Auth.validation.passwordMin')
      .max(20, 'Auth.validation.passwordMax')
      .regex(PASSWORD_REGEX, 'Auth.validation.passwordInvalidPattern'),
    passwordConfirmed: z.string().refine((value) => value.trim().length > 0, {
      message: 'Auth.validation.passwordConfirmedRequired',
    }),
    nickname: z
      .string()
      .refine((value) => value.trim().length > 0, {
        message: 'Auth.validation.nicknameRequired',
      })
      .max(10, 'Auth.validation.nicknameMax')
      .regex(NICKNAME_REGEX, 'Auth.validation.nicknameInvalidPattern'),
    termsOfService: z.boolean().refine((v) => v === true, {
      message: 'Auth.validation.termsRequired',
    }),
    privacyPolicy: z.boolean().refine((v) => v === true, {
      message: 'Auth.validation.termsRequired',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmed, {
    message: 'Auth.validation.passwordMismatch',
    path: ['passwordConfirmed'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

//닉네임 변경
export const nicknameSchema = z.object({
  nickname: z
    .string()
    .refine((value) => value.trim().length > 0, {
      message: 'Auth.validation.nicknameRequired',
    })
    .max(10, 'Auth.validation.nicknameMax')
    .regex(NICKNAME_REGEX, 'Auth.validation.nicknameInvalidPattern'),
});

export type NicknameFormData = z.infer<typeof nicknameSchema>;

//비밀번호 초기화
export const resetPasswordSchema = z.object({
  email: z.email('Auth.validation.emailInvalidPattern'),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

//비밀번호 재생성
export const updatePasswordSchema = z.object({
  password: z
    .string()
    .refine((value) => value.trim().length > 0, {
      message: 'Auth.validation.passwordRequired',
    })
    .min(8, 'Auth.validation.passwordMin')
    .max(20, 'Auth.validation.passwordMax')
    .regex(PASSWORD_REGEX, 'Auth.validation.passwordInvalidPattern'),
});

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
