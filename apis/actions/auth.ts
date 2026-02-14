'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/shared/supabase/sever';
import { CustomAuthError, handleAuthErrorCode, handleError } from '../error';

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;

  console.log('url', url);
  return url;
};

export async function getAuthorId(): Promise<{
  author_id: string;
  is_anon: boolean;
}> {
  const supabase = await createSupabaseServerClient();
  const cookieStore = await cookies();

  //인증 사용자
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id) {
    return {
      author_id: user.id,
      is_anon: false, // 인증된 사용자
    };
  }

  // 비인증 사용자
  let anon_id = cookieStore.get('anon_id')?.value;

  if (!anon_id) {
    anon_id = crypto.randomUUID();
    cookieStore.set({
      name: 'anon_id',
      value: anon_id,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1주
    });
  }

  return {
    author_id: anon_id,
    is_anon: true,
  };
}

export async function signUp({
  email,
  password,
  nickname,
  locale = 'ko',
}: {
  email: string;
  password: string;
  nickname: string;
  locale: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getURL()}/auth/callback`,
      data: {
        nickname,
        locale,
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
    const errorData: CustomAuthError = {
      success: false,
      code: handleAuthErrorCode(error),
      message: error.message,
    };
    throw new Error(JSON.stringify(errorData));
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

  console.log('google login', data, error);
  if (error) {
    throw error;
  }

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
    redirectTo: `${getURL()}/${locale}/auth/password/update`, //fallback용
    //이메일 템플릿에선 저장된 user_metadata의 locale 정보 이용
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
    const errorData: CustomAuthError = {
      success: false,
      code: handleAuthErrorCode(error),
      message: error.message,
    };
    throw new Error(JSON.stringify(errorData));
  }

  return data;
}

export async function updateNickname(newNickname: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.updateUser({
    data: { nickname: newNickname },
  });

  if (error) {
    handleError(error);
  }

  // 페이지 캐시 갱신
  revalidatePath('/', 'layout');

  return data;
}
