import { AuthError } from '@supabase/supabase-js';

export type CustomError = {
  message: string;
  result: false;
  errorCode: string;
  category?: ErrorCategory;
  timestamp?: string;
};

export type ErrorCategory =
  | 'NETWORK_ERROR'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'SERVER'
  | 'UNKNOWN';

export const AUTH_ERROR_KEYS = [
  'invalid_credentials',
  'session_expired',
  'email_not_confirmed',
  'signup_disabled',
  'over_email_send_rate_limit',
  'unknown_error',
] as const;

export type AuthErrorKeys = (typeof AUTH_ERROR_KEYS)[number];

export const handleAuthError = (error: unknown): string => {
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
