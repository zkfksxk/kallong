'use server';

import { type Lookbook } from '@/shared/common/types';
import { type Database } from '@/shared/supabase/database.types';
import { createSupabaseServerClient } from '@/shared/supabase/sever';
import { handleError } from '../AxiosObj';
import { getAuthorId } from './auth';

export type LookbookRes = Database['public']['Tables']['lookbook']['Row'];

export const createLookbook = async (lookbookData: Partial<Lookbook>) => {
  const supabase = await createSupabaseServerClient();
  const { author_id, is_anon } = await getAuthorId();

  const { data, error } = await supabase
    .from('lookbook')
    .insert({
      vote_name: lookbookData.voteName,
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

export async function getLookbookByAuthorId() {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  const { data, error } = await supabase
    .from('lookbook')
    .select('*')
    .eq('author_id', author_id)
    .order('created_at', { ascending: false });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function updateLookbookByAuthorId() {}
export async function deleteLookbookByAuthorId() {
  const supabase = await createSupabaseServerClient();
  const author_id = await getAuthorId();

  const { data, error } = await supabase
    .from('lookbook')
    .delete()
    .eq('author_id', author_id);

  if (error) {
    handleError(error);
  }

  return data;
}

// export const createPostWithImages = async ({
//   lookbookData,
//   file,
// }: {
//   lookbookData: Lookbook;
//   file: File;
// }) => {
//   const lookbook = await createLookbook(lookbookData);

//   try {
//     const fileExtension = file.name.split('.').pop() || 'webp';
//     const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
//     const filePath = `${lookbook.id}/${fileName}`;
//     const publicUrl = await uploadFile({
//       file: file,
//       filePath: filePath,
//     });

//     const updatedLookbook = await upadateLookbook({
//       id: lookbook.id,
//       image_url: publicUrl,
//     });

//     return updatedLookbook;
//   } catch (error) {
//     handleError(error as Error);
//   }
// };

// export async function uploadFile({
//   file,
//   filePath,
// }: {
//   file: File;
//   filePath: string;
// }) {
//   const supabase = await createSupabaseServerClient();

//   const { data, error } = await supabase.storage
//     .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
//     .upload(filePath, file, { upsert: true });

//   if (error) {
//     handleError(error);
//   }

//   const {
//     data: { publicUrl },
//   } = supabase.storage
//     .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
//     .getPublicUrl(data!.path);

//   return publicUrl;
// }
