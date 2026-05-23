'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Button } from '@/components';
import { useLookbookStore } from '@/hooks/provider/lookbook-provider';
import { useRouter } from '@/i18n/navigation';
import { LookbookFormData, lookbookSchema } from './_constants/form';

export default function LookbooksPage() {
  const t = useTranslations('Lookbooks.main');
  const router = useRouter();
  const {
    firstLookbook,
    secondLookbook,
    setVoteName,
    setFirstLookbookName,
    setSecondLookbookName,
  } = useLookbookStore((s) => s);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LookbookFormData>({
    resolver: zodResolver(lookbookSchema),
    defaultValues: {
      voteName: firstLookbook.voteName,
      firstName: firstLookbook.name,
      secondName: secondLookbook.name,
    },
  });

  const onSubmit = (data: LookbookFormData) => {
    setVoteName(data.voteName.trim());
    setFirstLookbookName(data.firstName.trim());
    setSecondLookbookName(data.secondName.trim());
    router.push('/lookbooks/create');
  };

  const getError = (message?: string) => {
    if (!message) return undefined;
    if (message === 'maxLength') return t('maxLength', { maxLength: 10 });
    return t(message as 'empty' | 'invalidCharacters');
  };

  return (
    <main className='bg-white dark:bg-black w-full flex flex-1 flex-col items-center justify-center gap-15'>
      <div className='w-full flex flex-col gap-5'>
        <TextInput
          label={t('voteNameLabel')}
          placeholder={t('voteNamePlaceholder')}
          {...register('voteName')}
          error={getError(errors.voteName?.message)}
        />
        <TextInput
          label={t('firstLookLabel')}
          placeholder={t('firstLookPlaceholder')}
          {...register('firstName')}
          error={getError(errors.firstName?.message)}
        />
        <TextInput
          label={t('secondLookLabel')}
          placeholder={t('secondLookPlaceholder')}
          {...register('secondName')}
          error={getError(errors.secondName?.message)}
        />
      </div>

      <Button onClick={handleSubmit(onSubmit)} fullWidth>
        {t('decorateButton')}
      </Button>
    </main>
  );
}
