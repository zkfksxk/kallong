'use client';

import { useParams } from 'next/navigation';
import { useGetDailyOutfit } from '@/apis/querys';
import { Fallback, Loader } from '@/components';
import EditDailyOutfitForm from '../../_components/edit-form';

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const { data: dailyOutfit, isLoading } = useGetDailyOutfit(id);

  if (isLoading) return <Loader />;
  if (!dailyOutfit) return <Fallback />;

  return <EditDailyOutfitForm dailyOutfit={dailyOutfit} />;
}
