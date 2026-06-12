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
  const t = useTranslations();
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
    if (message === 'maxLength') {
      return t('Validation.maxLength', { max: 10 });
    }

    if (message === 'invalidCharacters') {
      return t('Lookbook.validation.invalidCharacters');
    }

    return t('Lookbook.validation.empty');
  };

  return (
    <main className='bg-white dark:bg-black w-full flex flex-1 flex-col items-center justify-center gap-15'>
      <div className='w-full flex flex-col gap-5'>
        <TextInput
          label={t('Lookbook.field.voteName')}
          placeholder={t('Lookbook.placeholder.voteName')}
          {...register('voteName')}
          error={getError(errors.voteName?.message)}
        />
        <TextInput
          label={t('Lookbook.field.firstLook')}
          placeholder={t('Lookbook.placeholder.firstLook')}
          {...register('firstName')}
          error={getError(errors.firstName?.message)}
        />
        <TextInput
          label={t('Lookbook.field.secondLook')}
          placeholder={t('Lookbook.placeholder.secondLook')}
          {...register('secondName')}
          error={getError(errors.secondName?.message)}
        />
      </div>

      <Button onClick={handleSubmit(onSubmit)} fullWidth>
        {t('Lookbook.main.decorate')}
      </Button>
    </main>
  );
}
