import { SettingHeader } from '@/components/layouts/setting-header';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='relative bg-white max-w-[500px] w-full flex flex-1 flex-col px-5 pb-20'>
      <SettingHeader />
      {children}
    </main>
  );
}
