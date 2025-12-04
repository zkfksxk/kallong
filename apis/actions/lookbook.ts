'use server';

import { cookies } from 'next/headers';
import { type Lookbook } from '@/shared/common/types';
import { type Database } from '@/shared/supabase/database.types';
import { createSupabaseServerClient } from '@/shared/supabase/sever';
import { handleError } from '../AxiosObj';

export type LookbookRes = Database['public']['Tables']['lookbook']['Row'];

export const createLookbook = async (lookbookData: Partial<Lookbook>) => {
  const supabase = await createSupabaseServerClient();
  const cookieStore = await cookies();
  const anon_id = cookieStore.get('anon_id')?.value;

  if (!anon_id) {
    cookieStore.set({
      name: 'anon_id',
      value: crypto.randomUUID(),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, //7일
    });
  }

  const { data, error } = await supabase
    .from('lookbook')
    .insert({
      nickname: lookbookData.nickname,
      name: lookbookData.name,
      creator_anon_id: anon_id,
    })
    .select()
    .single();

  if (error) {
    console.log('create', lookbookData, anon_id);
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
  const cookieStore = await cookies();
  const anon_id = cookieStore.get('anon_id')?.value;

  if (!anon_id) {
    cookieStore.set({
      name: 'anon_id',
      value: crypto.randomUUID(),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, //7일
    });
  }

  const { data, error } = await supabase
    .rpc('update_lookbook_image', {
      p_lookbook_id: id,
      p_image_url: image_url,
      p_anon_id: anon_id,
    })
    .single();

  if (error) {
    console.log('update');
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
  const cookieStore = await cookies();
  const anon_id = cookieStore.get('anon_id')?.value;

  if (!anon_id) {
    cookieStore.set({
      name: 'anon_id',
      value: crypto.randomUUID(),
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

  return !!data; // null, undefined => false
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
