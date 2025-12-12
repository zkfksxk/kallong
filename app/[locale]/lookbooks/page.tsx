'use client';

import { useState } from 'react';
import { Button, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useLookbookStore } from '@/hooks/provider/lookbook-provider';
import { useRouter } from '@/i18n/navigation';
import { validateInput } from '@/shared/common/utils';

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

  const [tempVoteName, setTempVoteName] = useState(firstLookbook.voteName);
  const [firstName, setFirstName] = useState(firstLookbook.name);
  const [secondName, setSecondName] = useState(secondLookbook.name);

  const handleDecorate = () => {
    const trimmedFirst = firstName.trim();
    const trimmedSecond = secondName.trim();
    const trimmedVotename = tempVoteName.trim();

    const voteNameError = validateInput(trimmedVotename, 10);
    const firstError = validateInput(trimmedFirst, 10);
    const secondError = validateInput(trimmedSecond, 10);

    if (voteNameError) {
      alert(voteNameError);
      return;
    }
    if (firstError) {
      alert(firstError);
      return;
    }
    if (secondError) {
      alert(secondError);
      return;
    }

    setFirstLookbookName(trimmedFirst);
    setSecondLookbookName(trimmedSecond);
    setVoteName(trimmedVotename);
    router.push('/lookbooks/create');
  };

  return (
    <main className='bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center justify-center px-15 gap-15'>
      <div className='w-full flex flex-col gap-5'>
        <TextInput
          label={t('voteNameLabel')}
          value={tempVoteName}
          onChange={(e) => setTempVoteName(e.currentTarget.value)}
          placeholder={t('voteNamePlaceholder')}
        />
        <TextInput
          label={t('firstLookLabel')}
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
          placeholder={t('firstLookPlaceholder')}
        />
        <TextInput
          label={t('secondLookLabel')}
          value={secondName}
          onChange={(e) => setSecondName(e.currentTarget.value)}
          placeholder={t('secondLookPlaceholder')}
        />
      </div>

      <Button
        onClick={handleDecorate}
        variant='filled'
        color='red.5'
        size='lg'
        radius='md'
      >
        {t('decorateButton')}
      </Button>
    </main>
  );
}
