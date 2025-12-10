'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthApiError } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/shared/supabase/sever';
import { handleAuthErrorMessage } from '../AxiosObj';

export type AuthError = {
  success: false;
  code: string;
  message: string;
};

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;

  return url;
};

export async function signUp({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getURL()}/auth/callback`,
      data: {
        nickname,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error instanceof AuthApiError) {
      const errorData: AuthError = {
        success: false,
        code: error.code ?? '',
        message: handleAuthErrorMessage(error),
      };
      throw new Error(JSON.stringify(errorData));
    }

    throw new Error(
      JSON.stringify({
        success: false,
        code: 'unknown_error',
        message: error.message,
      })
    );
  }
  revalidatePath('/', 'layout');
  return data;
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${getURL()}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  //console.log('google login', data);
  if (data?.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  return { success: true };
}

export async function getProfile(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; //데이터 없음
    }
    throw error;
  }

  return data;
}

export async function resetPasswordForEmail(
  email: string,
  locale: string = 'ko'
) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}/${locale}/auth/password/update`,
  });

  if (error) throw error;
  return data;
}

export async function updatePassword(password: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    if (error instanceof AuthApiError) {
      const errorData: AuthError = {
        success: false,
        code: error.code ?? '',
        message: handleAuthErrorMessage(error),
      };
      throw new Error(JSON.stringify(errorData));
    }

    throw new Error(
      JSON.stringify({
        success: false,
        code: 'unknown_error',
        message: error.message,
      })
    );
  }

  return data;
}
