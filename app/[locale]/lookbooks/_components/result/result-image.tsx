'use client';

import React from 'react';
import Image from 'next/image';

type Props = {
  image_url: string;
};

export function ResultImage({ image_url }: Props) {
  return (
    <div className='relative w-full max-w-[500px] aspect-square flex items-center justify-center border border-gray-300 rounded-md overflow-hidden'>
      <Image src={image_url} alt='final-lookbook' fill />
    </div>
  );
}
