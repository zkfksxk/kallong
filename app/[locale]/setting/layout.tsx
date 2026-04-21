import { Header } from '@/components/layouts/header';

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=' bg-white dark:bg-black max-w-125 w-full flex flex-1 flex-col px-5 pb-20'>
      <Header isBackShow />
      {children}
    </main>
  );
}
