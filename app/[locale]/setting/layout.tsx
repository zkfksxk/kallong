import { Link } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icon';

export default async function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Back } = ICONS;

  return (
    <main className='relative bg-white max-w-[500px] w-full flex flex-1 flex-col px-5 pb-20 '>
      <header
        className={`
        w-full 
        max-w-[500px] 
        h-18
        flex 
        items-center 
        mx-auto
        bg-white
        gap-3
        z-50

        `}
      >
        <Link href='/'>
          <Back color='black' size={24} />
        </Link>
      </header>
      {children}
    </main>
  );
}
