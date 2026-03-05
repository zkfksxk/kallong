import { AuthError } from '@supabase/supabase-js';

export type CustomAuthError = {
  success: false;
  code: string;
  message: string;
};

export const AUTH_ERROR_KEYS = [
  'invalid_credentials',
  'session_expired',
  'email_not_confirmed',
  'signup_disabled',
  'over_email_send_rate_limit',
  'unknown_error',
] as const;

export type AuthErrorKey = (typeof AUTH_ERROR_KEYS)[number];

export const handleAuthErrorCode = (error: unknown): string => {
  if (error instanceof AuthError && error.code) {
    const isKnownKey = (AUTH_ERROR_KEYS as readonly string[]).includes(
      error.code
    );
    return isKnownKey ? error.code : 'unknown_error';
  }
  return 'unknown_error';
};

export const handleError = (error: Error) => {
  console.error(error);
  throw new Error(error.message);
};
