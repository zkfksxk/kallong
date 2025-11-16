'use client';

import React from 'react';
import Image from 'next/image';
import { Lookbook } from '@/shared/common/types';

type Props = {
  lookbook: Lookbook;
};

export function CreateImage({ lookbook }: Props) {
  const { finalUrl, topUrl, bottomUrl, shoesUrl, accessoryUrls, background } =
    lookbook.data;

  if (finalUrl) {
    return (
      <div className='relative w-full max-w-[500px] aspect-square flex items-center justify-center border border-gray-300 rounded-md overflow-hidden'>
        <Image src={finalUrl} alt='final-lookbook' fill />
      </div>
    );
  }

  const outfitCount = [
    topUrl,
    bottomUrl,
    shoesUrl,
    accessoryUrls?.hat,
    accessoryUrls?.bag,
    accessoryUrls?.etc,
  ].filter(Boolean).length;

  const isSimpleLayout = outfitCount <= 2;

  return (
    <div
      className='w-full border border-gray-300 rounded-md'
      style={{ backgroundColor: background }}
    >
      <div
        id='poster'
        className={`relative aspect-square w-full max-w-[500px] mx-auto flex ${
          isSimpleLayout
            ? 'flex-row items-center justify-center'
            : 'flex-row items-center px-8'
        }`}
      >
        {isSimpleLayout ? (
          <>
            <div className='flex flex-col'>
              {topUrl && (
                <img
                  src={topUrl}
                  alt='상의'
                  className='max-h-[120px] object-contain mb-4'
                />
              )}
              {bottomUrl && (
                <img
                  src={bottomUrl}
                  alt='하의'
                  className='max-h-[120px] object-contain'
                />
              )}
              {shoesUrl && (
                <img
                  src={shoesUrl}
                  alt='신발'
                  className='max-h-[80px] object-contain'
                />
              )}
            </div>
            <div className='flex flex-col'>
              {accessoryUrls?.hat && (
                <img
                  src={accessoryUrls.hat}
                  alt='모자'
                  className='max-h-[80px] object-contain'
                />
              )}
              {accessoryUrls?.bag && (
                <img
                  src={accessoryUrls.bag}
                  alt='가방'
                  className='max-h-[80px] object-contain'
                />
              )}
              {accessoryUrls?.etc && (
                <img
                  src={accessoryUrls.etc}
                  alt='기타'
                  className='max-h-[80px] object-contain'
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col items-center justify-center gap-3'>
              {topUrl && (
                <img
                  src={topUrl}
                  alt='상의'
                  className='max-h-[120px] object-contain'
                />
              )}
              {bottomUrl && (
                <img
                  src={bottomUrl}
                  alt='하의'
                  className='max-h-[140px] object-contain'
                />
              )}
            </div>

            <div className='flex flex-col items-center justify-center gap-3'>
              {accessoryUrls?.hat && (
                <img
                  src={accessoryUrls.hat}
                  alt='모자'
                  className='max-h-[60px] object-contain'
                />
              )}
              {accessoryUrls?.bag && (
                <img
                  src={accessoryUrls.bag}
                  alt='가방'
                  className='max-h-[60px] object-contain'
                />
              )}
              {accessoryUrls?.etc && (
                <img
                  src={accessoryUrls.etc}
                  alt='기타'
                  className='max-h-[60px] object-contain'
                />
              )}
              {shoesUrl && (
                <img
                  src={shoesUrl}
                  alt='신발'
                  className='max-h-[80px] object-contain'
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
