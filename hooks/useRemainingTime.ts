'use client';

import { useEffect, useState } from 'react';
import { timeCalc } from '@/shared/common/utils';

export function useRemainingTime(createdAt?: string) {
  const [remaining, setRemaining] = useState('--:--');

  useEffect(() => {
    if (!createdAt) return;

    setRemaining(timeCalc(createdAt));

    const interval = setInterval(() => {
      setRemaining(timeCalc(createdAt));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return remaining;
}
