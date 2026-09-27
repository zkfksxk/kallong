'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components';
import { useLookbookStore } from '@/hooks/provider';
import { DeleteIcon, ImageAddIcon } from '@/shared/common/icons';
import { useLookbookEditor } from '../../_hooks/useLookbookEditor';

type Props = { targetLookbook: 'first' | 'second' };

export function LookbookForm({ targetLookbook }: Props) {
  const t = useTranslations('Lookbook.create');
  const { firstLookbook, secondLookbook } = useLookbookStore((s) => s);
  const {
    fileInputRef,
    url,
    handleOpenImagePicker,
    handleUpload,
    handleRemoveFileAndFinalUrl,
  } = useLookbookEditor(targetLookbook, 'finalUrl');

  const lookbook = targetLookbook === 'first' ? firstLookbook : secondLookbook;

  const { finalUrl, topUrl, bottomUrl, shoesUrl, accessoryUrls, background } =
    lookbook.data;

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
    <>
      <div className='relative w-full max-w-125 aspect-square flex items-center justify-center border border-gray-300 rounded-md overflow-hidden'>
        {finalUrl ? (
          <>
            <Image src={finalUrl} alt='final-lookbook' fill />

            <Button
              variant='ghost'
              disabled={!url}
              onClick={handleRemoveFileAndFinalUrl}
              className='absolute top-3 right-3 z-10 flex items-center justify-center !w-10 !h-10 rounded-full bg-white shadow-md'
            >
              <DeleteIcon size={24} className='text-black' />
            </Button>
          </>
        ) : (
          <div
            className='w-full h-full'
            style={{ backgroundColor: background }}
          >
            <div
              id='poster'
              className={`relative aspect-square w-full max-w-125 mx-auto flex ${
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
                        className='max-h-30 object-contain mb-4'
                      />
                    )}
                    {bottomUrl && (
                      <img
                        src={bottomUrl}
                        alt='하의'
                        className='max-h-30 object-contain'
                      />
                    )}
                    {shoesUrl && (
                      <img
                        src={shoesUrl}
                        alt='신발'
                        className='max-h-20 object-contain'
                      />
                    )}
                  </div>

                  <div className='flex flex-col'>
                    {accessoryUrls?.hat && (
                      <img
                        src={accessoryUrls.hat}
                        alt='모자'
                        className='max-h-20 object-contain'
                      />
                    )}
                    {accessoryUrls?.bag && (
                      <img
                        src={accessoryUrls.bag}
                        alt='가방'
                        className='max-h-20 object-contain'
                      />
                    )}
                    {accessoryUrls?.etc && (
                      <img
                        src={accessoryUrls.etc}
                        alt='기타'
                        className='max-h-20 object-contain'
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
                        className='max-h-30 object-contain'
                      />
                    )}
                    {bottomUrl && (
                      <img
                        src={bottomUrl}
                        alt='하의'
                        className='max-h-35 object-contain'
                      />
                    )}
                  </div>

                  <div className='flex flex-col items-center justify-center gap-3'>
                    {accessoryUrls?.hat && (
                      <img
                        src={accessoryUrls.hat}
                        alt='모자'
                        className='max-h-15 object-contain'
                      />
                    )}
                    {accessoryUrls?.bag && (
                      <img
                        src={accessoryUrls.bag}
                        alt='가방'
                        className='max-h-15 object-contain'
                      />
                    )}
                    {accessoryUrls?.etc && (
                      <img
                        src={accessoryUrls.etc}
                        alt='기타'
                        className='max-h-15 object-contain'
                      />
                    )}
                    {shoesUrl && (
                      <img
                        src={shoesUrl}
                        alt='신발'
                        className='max-h-20 object-contain'
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-col items-center mt-8'>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleUpload}
          accept='image/*'
          className='hidden'
        />

        <div className='flex justify-center'>
          <Button
            variant='filled'
            onClick={handleOpenImagePicker}
            className='py-1'
            icon={<ImageAddIcon size={24} color='white' />}
          >
            {t('imageAdd')}
          </Button>
        </div>
      </div>
    </>
  );
}
