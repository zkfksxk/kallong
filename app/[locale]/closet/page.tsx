'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, Text } from '@mantine/core';
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
import { MoreIcon } from '@/shared/common/icons';
import ClosetCalendar from './_components/closet-calendar';

export default function ClosetPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
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
        title: t('Common.fail', { type: t('Closet.title') }),
        message: t('Closet.error.deleteFailed'),
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
      <div className='flex flex-col w-full items-center justify-center mt-8 bg-red-100 rounded-md gap-3'>
        {selectedOutfit ? (
          <Link className='size-full' href={`/closet/${selectedOutfit.id}`}>
            <div className='size-full flex flex-row items-start p-5 gap-5'>
              <Image
                src={selectedOutfit?.image_url}
                alt='daily-outfit'
                width={100}
                height={80}
              />
              <Text c='black' fw={700}>
                {selectedOutfit.name}
              </Text>
              <div className='ml-auto'>
                <Menu width={140} position='bottom-end'>
                  <Menu.Target>
                    <Button
                      variant='ghost'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <MoreIcon size={20} color='black' />
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/closet/${selectedOutfit.id}/edit`);
                      }}
                    >
                      {t('Common.edit')}
                    </Menu.Item>

                    <Menu.Item
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(e);
                      }}
                    >
                      {t('Common.delete')}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
          </Link>
        ) : (
          <div className='flex flex-col justify-center items-center gap-2.5'>
            <Text c='black' fw={500}>
              {t('Closet.emptyMessage')}
            </Text>
            <Button
              variant='ghost'
              onClick={handleRecord}
              className='text-black!'
            >
              {t('Closet.goToRecord')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
