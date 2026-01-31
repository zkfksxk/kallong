'use client';

import { SettingHeader } from '@/components/layouts/setting-header';
import { usePathname, useRouter } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Back } = ICONS;
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (pathname === '/setting') {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <main className=' bg-white max-w-125 w-full flex flex-1 flex-col px-5 pb-20'>
      <SettingHeader
        isSettingShow={false}
        leftComponent={
          <button onClick={handleBack}>
            <Back color='black' size={24} />
          </button>
        }
      />
      {children}
    </main>
  );
}
