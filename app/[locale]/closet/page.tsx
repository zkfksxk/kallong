'use client';

import { useState } from 'react';
import { Text } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import {
  useDeleteDailyOutfit,
  useGetDailyOutfitInMonth,
} from '@/apis/querys/outfit';
import { Button, Header, showNotification } from '@/components';
import { Link, useRouter } from '@/i18n/navigation';
import { TrashIcon } from '@/shared/common/icons';

export default function ClosetPage() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>(
    dayjs().format('YYYY-MM-DD')
  );
  const t = useTranslations('Closet');
  const { data: outfits } = useGetDailyOutfitInMonth(currentDay);
  const { mutateAsync: deleteMutate } = useDeleteDailyOutfit();

  const selectedOutfit = outfits?.find(
    (item) => item.selected_day === selectedDay
  );

  const handleSelect = (date: string) => {
    setSelectedDay(date);
  };

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
      <Calendar
        className='w-full'
        hideOutsideDates
        onPreviousMonth={() =>
          setCurrentDay(dayjs(currentDay).subtract(1, 'month').toDate())
        }
        onNextMonth={() =>
          setCurrentDay(dayjs(currentDay).add(1, 'month').toDate())
        }
        getDayProps={(date) => {
          const isFuture = dayjs(date).isAfter(dayjs(), 'day');
          const isCurrent = dayjs(date).format('YYYY-MM-DD') === selectedDay;
          const hasOutfit = outfitDays.has(dayjs(date).format('YYYY-MM-DD'));

          return {
            onClick: () => !isFuture && handleSelect(date),
            disabled: isFuture,
            style: {
              ...(isFuture ? { color: '#ccc', cursor: 'not-allowed' } : {}),
              ...(hasOutfit
                ? {
                    backgroundColor: '#FFC9C8',
                    color: 'black',
                  }
                : {}),
              ...(isCurrent
                ? {
                    backgroundColor: '#e3231f',
                    color: 'white',
                  }
                : {}),
            },
          };
        }}
        styles={{
          calendarHeader: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            placeItems: 'center',
            margin: '0 auto 10px auto',
            color:
              'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
          },
          calendarHeaderControl: {
            width: '40px',
            height: '40px',
          },
          calendarHeaderLevel: { width: '100%', flex: 1, textAlign: 'center' },
          levelsGroup: { width: '100%' },
          yearsList: { width: '100%', tableLayout: 'fixed' as const },
          yearsListCell: {
            textAlign: 'center',
            verticalAlign: 'middle',
            width: '100%',
          },
          yearsListControl: {
            width: '100%',
          },
          monthsList: {
            width: '100%',
            tableLayout: 'fixed' as const,
          },
          monthsListCell: {
            textAlign: 'center',
            verticalAlign: 'middle',
            width: '100%',
          },
          monthsListControl: {
            width: '100%',
          },
          monthCell: {
            width: '100%',
            textAlign: 'center',
          },
          month: { width: '100%' },
          weekday: {
            fontSize: '14px',
          },
          day: {
            fontSize: '14px',
            margin: '4px',
          },
        }}
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
