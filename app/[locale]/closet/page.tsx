'use client';

import { useState } from 'react';
import { ActionIcon, Button, Text } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useDeleteDailyOutfit } from '@/apis/querys/outfit/useDeleteDailyOutfit';
import { useGetDailyOutfitInMonth } from '@/apis/querys/outfit/useGetDailyOutfitInMonth';
import { ClosetHeader } from '@/components/layouts/closet-header';
import { useOutfitStore } from '@/hooks/provider/outfit-provider';
import { Link, useRouter } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';

export default function ClosetPage() {
  const router = useRouter();
  const { setDailyOutfit } = useOutfitStore((s) => s);
  const [currentDay, setCurrentDay] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>(
    dayjs().format('YYYY-MM-DD')
  );
  const t = useTranslations('Closet');
  const { data: outfits } = useGetDailyOutfitInMonth(currentDay);
  const { mutateAsync: deleteMutate } = useDeleteDailyOutfit();

  const handleBack = () => {
    router.back();
  };

  const { Trash, Alert, Back } = ICONS;

  const selectedOutfit = outfits?.find(
    (item) => item.selected_day === selectedDay
  );

  const handleSelect = (date: string) => {
    setSelectedDay(date);
  };

  const handleRecord = () => {
    if (!selectedDay) {
      alert('날짜를 선택해주세요');
      return;
    }
    setDailyOutfit({ selected_day: selectedDay });

    router.push('/closet/write');
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      deleteMutate(selectedOutfit.id);
    } catch {
      notifications.show({
        title: 'outfit Failed',
        message: '삭제 중 에러가 발생했습니다.',
        icon: <Alert.Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
    }
  };

  return (
    <div className='relative bg-white dark:bg-black flex flex-1 flex-col'>
      <ClosetHeader
        leftComponent={
          <button onClick={handleBack}>
            <Back className='text-black dark:text-white' size={24} />
          </button>
        }
      />
      <Calendar
        hideOutsideDates
        onPreviousMonth={() =>
          setCurrentDay(dayjs(currentDay).subtract(1, 'month').toDate())
        }
        onNextMonth={() =>
          setCurrentDay(dayjs(currentDay).add(1, 'month').toDate())
        }
        getDayProps={(date) => {
          const isFuture = dayjs(date).isAfter(dayjs(), 'day');
          const isCurrent = dayjs(date).isSame(dayjs(currentDay), 'day');
          return {
            onClick: () => !isFuture && handleSelect(date),
            disabled: isFuture,
            style: {
              ...(isFuture ? { color: '#ccc', cursor: 'not-allowed' } : {}),
              ...(isCurrent
                ? {
                    backgroundColor: '#FFC9C8',
                    color: 'white',
                    borderRadius: '50%', // 원형
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
          calendarHeaderLevel: { width: '100%', flex: 1, textAlign: 'center' },
          monthsList: { width: '100%' },
          monthCell: {
            width: '100%',
            textAlign: 'center',
            verticalAlign: 'middle',
          },
          month: { width: '100%' },
          weekday: {
            fontSize: '14px',
          },
          day: {
            fontSize: '14px',
          },
        }}
      />
      <div className='flex flex-col w-full min-h-37.5 items-center justify-center mt-8 bg-[#ffe2e1] rounded-md gap-3'>
        {selectedOutfit ? (
          <Link href={`/closet/${selectedOutfit.id}`}>
            <div className='flex flex-row gap-2'>
              <Text c='black' fw={700}>
                {selectedOutfit.selected_day}
              </Text>
              <ActionIcon
                variant='transparent'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(e);
                }}
              >
                <Trash color='black' size={24} />
              </ActionIcon>
            </div>
          </Link>
        ) : (
          <div className='flex flex-col justify-center align-center'>
            <Text c='black'>{t('emptyMessage')}</Text>
            <Button
              onClick={handleRecord}
              variant='transparent'
              size='lg'
              radius='md'
            >
              {t('goToRecord')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
