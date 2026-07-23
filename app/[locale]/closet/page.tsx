'use client';

import { useState } from 'react';
import { Text } from '@mantine/core';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { useLocale, useTranslations } from 'next-intl';
import {
  useDeleteDailyOutfit,
  useGetDailyOutfitInMonth,
} from '@/apis/querys/outfit';
import { Button, Header, showNotification } from '@/components';
import { Link, useRouter } from '@/i18n/navigation';
import { TrashIcon } from '@/shared/common/icons';
import ClosetCalendar from './_components/closet-calendar';

export default function ClosetPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Closet');
  const [currentDay, setCurrentDay] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>(
    dayjs().format('YYYY-MM-DD') //사용자의 로컬 date
  );
  const { data: outfits } = useGetDailyOutfitInMonth(currentDay);
  const { mutateAsync: deleteMutate } = useDeleteDailyOutfit();

  const selectedOutfit = outfits?.find(
    (item) => item.selected_day === selectedDay
  );

  const handleRecord = () => {
    if (!selectedDay) {
      return;
    }
    router.push(`/closet/write?day=${selectedDay}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      deleteMutate(selectedOutfit.id);
    } catch {
      showNotification({
        title: 'Outfit failed',
        message: t('error.deleteFailed'),
        type: 'fail',
      });
    }
  };

  const outfitDays = new Set(outfits?.map((item) => item.selected_day) ?? []);

  return (
    <div className='relative bg-white dark:bg-black flex flex-1 flex-col'>
      <Header isBackShow />
      <ClosetCalendar
        locale={locale}
        currentDay={currentDay}
        selectedDay={selectedDay}
        outfitDays={outfitDays}
        onChangeMonth={setCurrentDay}
        onSelectDay={setSelectedDay}
      />
      <div className='flex flex-col w-full min-h-37.5 items-center justify-center mt-8 bg-red-100 rounded-md gap-3'>
        {selectedOutfit ? (
          <Link href={`/closet/${selectedOutfit.id}`}>
            <div className='flex flex-row items-center gap-8'>
              <Text c='black' fw={700}>
                {selectedOutfit.selected_day}
              </Text>
              <Button
                variant='ghost'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(e);
                }}
              >
                <TrashIcon color='black' size={24} />
              </Button>
            </div>
          </Link>
        ) : (
          <div className='flex flex-col justify-center items-center gap-2.5'>
            <Text c='black' fw={500}>
              {t('emptyMessage')}
            </Text>
            <Button
              variant='ghost'
              onClick={handleRecord}
              className='text-black!'
            >
              {t('goToRecord')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
