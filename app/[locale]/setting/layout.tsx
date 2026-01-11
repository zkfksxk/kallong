'use client';

import { Header } from '@/components/layouts/header';
import { useRouter } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Back } = ICONS;
  const router = useRouter();

  return (
    <main className=' bg-white max-w-[500px] w-full flex flex-1 flex-col px-5 pb-20'>
      <Header
        isSettingShow={false}
        leftComponent={
          <button onClick={() => router.back()}>
            <Back color='black' size={24} />
          </button>
        }
      />
      {children}
    </main>
  );
}
