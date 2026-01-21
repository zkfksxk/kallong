'use server';

import { type Lookbook } from '@/shared/common/types';
import { type Database } from '@/shared/supabase/database.types';
import { createSupabaseServerClient } from '@/shared/supabase/sever';
import { handleError } from '../error';
import { getAuthorId } from './auth';
import { deleteImagesInPath } from './storage';

export type LookbookRes = Database['public']['Tables']['lookbook']['Row'];
export type VoteRes = Database['public']['Tables']['vote']['Row'];

export const createLookbook = async (lookbookData: Partial<Lookbook>) => {
  const supabase = await createSupabaseServerClient();
  const { author_id, is_anon } = await getAuthorId();

  const { data, error } = await supabase
    .from('lookbook')
    .insert({
      name: lookbookData.name,
      author_id: author_id,
      is_anon: is_anon,
    })
    .select()
    .single();

  if (error) {
    handleError(error);
  }
  return data;
};

export const createVote = async ({
  lookbook_id_a,
  lookbook_id_b,
  vote_name,
}: {
  lookbook_id_a: string;
  lookbook_id_b: string;
  vote_name: string;
}) => {
  const supabase = await createSupabaseServerClient();
  const { author_id, is_anon } = await getAuthorId();

  const { data, error } = await supabase
    .from('vote')
    .insert({
      lookbook_id_a: lookbook_id_a,
      lookbook_id_b: lookbook_id_b,
      vote_name: vote_name,
      author_id: author_id,
      is_anon: is_anon,
    })
    .select()
    .single();

  if (error) {
    handleError(error);
  }
  return data;
};

export const upadateLookbook = async ({
  id,
  image_url,
}: {
  id: string;
  image_url: string;
}) => {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  const { data, error } = await supabase
    .rpc('update_lookbook_image', {
      p_lookbook_id: id,
      p_image_url: image_url,
      p_author_id: author_id,
    })
    .single();

  if (error) {
    handleError(error);
  }
  return data;
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
  const { author_id } = await getAuthorId();

  const { data, error } = await supabase.rpc('lookbook_like', {
    p_lookbook_id: lookbook_id,
    p_anon_id: author_id,
  });

  if (error) {
    handleError(error);
  }

  return data;
};

export async function checkLookbookLiked(lookbook_id: string) {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  if (!author_id) return false;

  const { data, error } = await supabase
    .from('votes_log')
    .select('id')
    .eq('lookbook_id', lookbook_id)
    .eq('voter_anon_id', author_id)
    .maybeSingle();

  if (error) {
    handleError(error);
    return false;
  }

  return !!data; // null, undefined => false
}

export async function getVoteById({ from, to }: { from: number; to: number }) {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  const { data, error, count } = await supabase
    .from('vote')
    .select('*')
    .eq('author_id', author_id)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    handleError(error);
  }

  return { data: data || [], count: count || 0 };
}

export async function deleteLookbookById(lookbookId: string) {
  const supabase = await createSupabaseServerClient();
  const { author_id, is_anon } = await getAuthorId();

  if (is_anon) throw Error('인증이 안 된 사용자입니다.');

  await deleteImagesInPath(lookbookId);

  const { data, error } = await supabase
    .from('lookbook')
    .delete()
    .eq('id', lookbookId)
    .eq('author_id', author_id)
    .select()
    .single();

  if (error) {
    handleError(error);
  }

  return data;
}

// export async function deleteImagesInPath(path: string) {
//   const supabase = await createSupabaseServerClient();
//   const { data: files, error: fetchFilesError } = await supabase.storage
//     .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
//     .list(path);

//   if (fetchFilesError) throw fetchFilesError;

//   if (!files || files.length === 0) {
//     return;
//   }

//   const { error: removeError } = await supabase.storage
//     .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
//     .remove(files.map((file) => `${path}/${file.name}`));

//   if (removeError) throw removeError;
// }
