'use client';

import { useState } from 'react';
import { Tabs, Text } from '@mantine/core';
import { OUTFIT_CATEGORY, OutfitCategory } from '@/shared/common/types';
import { OutfitSection } from './outfit-section';

type Props = { target: 'first' | 'second' };
type EditorTabValue = OutfitCategory | 'finalUrl' | 'background';

export const LookbookEditor = ({ target }: Props) => {
  const [activeTab, setActiveTab] = useState<EditorTabValue | null>('finalUrl');
  // const {
  //   firstLookbook,
  //   secondLookbook,
  //   updateFirstLookbook,
  //   updateSecondLookbook,
  // } = useLookbookStore((s) => s);

  // const lookbook = target === 'first' ? firstLookbook : secondLookbook;
  // const background = lookbook.data.background;

  // const handleBackgroundColor = (color: string) => {
  //   if (target === 'first') updateFirstLookbook({ background: color });
  //   else updateSecondLookbook({ background: color });
  // };

  const handleTabChange = (value: string | null) => {
    if (value === null) return setActiveTab(null);

    const stringValue = value as EditorTabValue;

    if (OUTFIT_CATEGORY.includes(stringValue as OutfitCategory)) {
      setActiveTab(stringValue as OutfitCategory);
      return;
    }

    if (stringValue === 'finalUrl' || stringValue === 'background') {
      setActiveTab(stringValue);
      return;
    }
  };

  return (
    <Tabs color='black' value={activeTab} onChange={handleTabChange} mt='sm'>
      <Tabs.List>
        {/* <Tabs.Tab value='top'>
          <Text>상의</Text>
        </Tabs.Tab>
        <Tabs.Tab value='bottom'>
          <Text>하의</Text>
        </Tabs.Tab>
        <Tabs.Tab value='shoes'>
          <Text>신발</Text>
        </Tabs.Tab>
        <Tabs.Tab value='accessory'>
          <Text>악세사리</Text>
        </Tabs.Tab> */}
        <Tabs.Tab value='finalUrl'>
          <Text>이미지</Text>
        </Tabs.Tab>
        {/* <Tabs.Tab value='background'>
          <Text>배경</Text>
        </Tabs.Tab> */}
      </Tabs.List>
      {/* <Tabs.Panel value='top' pt='md'>
        <OutfitSection
          targetLookbook={target}
          targetOutfit='topUrl'
          title='상의를 추가해보세요!'
        />
      </Tabs.Panel>
      <Tabs.Panel value='bottom' pt='md'>
        <OutfitSection
          targetLookbook={target}
          targetOutfit='bottomUrl'
          title='하의를 추가해보세요!'
        />
      </Tabs.Panel>
      <Tabs.Panel value='shoes' pt='md'>
        <OutfitSection
          targetLookbook={target}
          targetOutfit='shoesUrl'
          title='신발을 추가해보세요!'
        />
      </Tabs.Panel>
      <Tabs.Panel value='accessory' pt='md'>
        <AccessorySection targetLookbook={target} />
      </Tabs.Panel> */}
      <Tabs.Panel value='finalUrl' mb='xl'>
        <OutfitSection
          targetLookbook={target}
          targetOutfit='finalUrl'
          title='이미지를 추가해보세요!'
        />
      </Tabs.Panel>
      {/* <Tabs.Panel value='background' mb='xl'>
        <div className='flex flex-1 flex-col items-center gap-2'>
          <Text>배경색을 선택하세요.</Text>
          <div className='flex flex-col items-center gap-2'>
            <Text>배경색</Text>
            <div className='flex items-center space-x-4'>
              <Popover
                width={320}
                position='bottom'
                withArrow
                shadow='md'
                trapFocus
              >
                <Popover.Target>
                  <div
                    role='button'
                    aria-label='배경색 선택'
                    className='h-8 w-8 cursor-pointer rounded-full border border-gray-300'
                    style={{ backgroundColor: background }}
                  />
                </Popover.Target>

                <Popover.Dropdown>
                  <ColorPicker
                    value={background}
                    onChange={handleBackgroundColor}
                    withPicker
                    format='hex'
                  />
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
        </div>
      </Tabs.Panel> */}
    </Tabs>
  );
};
