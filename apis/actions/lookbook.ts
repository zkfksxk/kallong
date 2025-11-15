'use server';

import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { Lookbook } from '@/shared/common/types';
import { Database } from '@/shared/supabase/database.types';
import { createSupabaseServerClient } from '@/shared/supabase/sever';
import { handleError } from '../AxiosObj';

export type LookbookRes = Database['public']['Tables']['lookbook']['Row'];

export const createLookbook = async (lookbookData: Lookbook) => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('lookbook')
    .insert({
      nickname: lookbookData.nickname,
      image_url: lookbookData.data.finalUrl,
      name: lookbookData.name,
    })
    .select('id')
    .single();

  if (error) {
    handleError(error);
  }
  return data?.id;
};

export const getLookbook = async (id: string) => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('lookbook')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    handleError(error);
  }

  return data;
};

export const toggleLookbookLike = async (lookbook_id: string) => {
  const supabase = await createSupabaseServerClient();
  const cookieStore = await cookies();
  const anon_id = cookieStore.get('anon_id')?.value;

  if (!anon_id) {
    cookieStore.set({
      name: 'anon_id',
      value: randomUUID(),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, //7일
    });
  }

  const { data, error } = await supabase.rpc('lookbook_like', {
    p_lookbook_id: lookbook_id,
    p_anon_id: anon_id,
  });

  if (error) {
    handleError(error);
  }

  return data;
};

export async function checkLookbookLiked(lookbook_id: string) {
  const supabase = await createSupabaseServerClient();
  const cookieStore = await cookies();
  const anon_id = cookieStore.get('anon_id')?.value;

  if (!anon_id) return false;

  console.log('check!!');
  const { data, error } = await supabase
    .from('votes_log')
    .select('id')
    .eq('lookbook_id', lookbook_id)
    .eq('voter_anon_id', anon_id)
    .maybeSingle();

  if (error) {
    handleError(error);
    return false;
  }

  return !!data;
}
