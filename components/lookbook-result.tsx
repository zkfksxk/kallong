'use client';

import React from 'react';
import Image from 'next/image';
import { LookbookRes } from '@/apis/actions/lookbook';

type Props = {
  lookbook: LookbookRes;
};

export function LookbookResult({ lookbook }: Props) {
  return (
    <div className='relative w-full max-w-[500px] aspect-square flex items-center justify-center border border-gray-300 rounded-md overflow-hidden'>
      <Image src={lookbook.image_url} alt='final-lookbook' fill />
    </div>
  );
}
