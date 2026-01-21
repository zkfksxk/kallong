import { createSupabaseServerClient } from '@/shared/supabase/sever';

export async function deleteImagesInPath(path: string) {
  const supabase = await createSupabaseServerClient();
  const { data: files, error: fetchFilesError } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .list(path);

  if (fetchFilesError) throw fetchFilesError;

  if (!files || files.length === 0) {
    return;
  }

  const { error: removeError } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .remove(files.map((file) => `${path}/${file.name}`));

  if (removeError) throw removeError;
}

export async function deleteOutfitImagesInPath(
  outfitId: string,
  authorId: string
) {
  const supabase = await createSupabaseServerClient();
  const fullPath = `${authorId}/${outfitId}`;

  const { data: files, error: fetchFilesError } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_OUTFIT_STORAGE_BUCKET!)
    .list(fullPath);

  if (fetchFilesError) throw fetchFilesError;

  if (!files || files.length === 0) {
    return;
  }

  const { error: removeError } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_OUTFIT_STORAGE_BUCKET!)
    .remove(files.map((file) => `${fullPath}/${file.name}`));

  if (removeError) throw removeError;
}
