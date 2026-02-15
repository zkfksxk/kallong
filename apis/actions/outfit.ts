'use server';

import dayjs from 'dayjs';
import { DailyOutfitForm } from '@/shared/common/types';
import { Database } from '@/shared/supabase/database.types';
import { createSupabaseServerClient } from '@/shared/supabase/sever';
import { handleError } from '../error';
import { getAuthorId } from './auth';
import { deleteOutfitImagesInPath } from './storage';

export type OutfitRes = Database['public']['Tables']['outfit']['Row'];

export const createDailyOutfit = async (outfit: Partial<DailyOutfitForm>) => {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  const { data, error } = await supabase
    .from('outfit')
    .insert({
      name: outfit.name,
      description: outfit.description,
      author_id: author_id,
      selected_day: outfit.selected_day,
    })
    .select()
    .single();

  if (error) {
    handleError(error);
  }
  return data;
};

export const upadateDailyOutfitImage = async ({
  id,
  image_url,
}: {
  id: string;
  image_url: string;
}) => {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  const { data, error } = await supabase
    .from('outfit')
    .update({
      image_url: image_url,
    })
    .eq('id', id)
    .eq('author_id', author_id);

  if (error) {
    handleError(error);
  }
  return data;
};

export const upadateDailyOutfit = async ({
  id,
  image_url,
  name,
  description,
}: {
  id: string;
  image_url?: string;
  name: string;
  description?: string;
}) => {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  const { data, error } = await supabase
    .from('outfit')
    .update({
      image_url: image_url,
      name: name,
      description: description,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('author_id', author_id);

  if (error) {
    handleError(error);
  }
  return data;
};

export const getDailyOutfit = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  const { data, error } = await supabase
    .from('outfit')
    .select('*')
    .eq('author_id', author_id)
    .eq('id', id)
    .single();

  if (error) {
    handleError(error);
  }

  return data;
};

export async function getDailyOutfitInMonth({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  const startDate = dayjs(`${year}-${month}-01`)
    .startOf('month')
    .format('YYYY-MM-DD');
  const endDate = dayjs(`${year}-${month}-01`)
    .endOf('month')
    .format('YYYY-MM-DD');

  const { data, error } = await supabase
    .from('outfit')
    .select('*')
    .eq('author_id', author_id)
    .gte('selected_day', startDate)
    .lte('selected_day', endDate)
    .order('created_at', { ascending: true });

  if (error) {
    handleError(error);
  }

  return data || [];
}

export async function getOutfitList({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  const { data, error, count } = await supabase
    .from('outfit')
    .select('*')
    .eq('author_id', author_id)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    handleError(error);
  }

  return { data: data || [], count: count || 0 };
}

export async function deleteDailyOutfit(id: string) {
  const supabase = await createSupabaseServerClient();
  const { author_id } = await getAuthorId();

  await deleteOutfitImagesInPath(author_id, id);

  const { data, error } = await supabase
    .from('outfit')
    .delete()
    .eq('id', id)
    .eq('author_id', author_id)
    .select()
    .single();

  if (error) {
    handleError(error);
  }

  return data;
}
