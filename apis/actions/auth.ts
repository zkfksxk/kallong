'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/shared/supabase/sever';

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
}: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
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
    throw error;
  }

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

export async function getUser() {
  const supabase = await createSupabaseServerClient();
  const user = await supabase.auth.getUser();
  return user?.data?.user;
}

export async function resetPasswordForEmail(email: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}/mypage/password/update`,
  });

  if (error) throw error;
  return data;
}

export async function updatePassword(password: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
  return data;
}
