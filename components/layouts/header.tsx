import { IoSettingsOutline as Setting } from 'react-icons/io5';
import { Link } from '@/i18n/navigation';

export const Header = () => {
  return (
    <header
      className='
        w-full 
        max-w-[500px] 
        h-[60px] 
        flex 
        items-center 
        justify-end 
        px-5 
        mx-auto
        bg-white
        gap-3
        '
    >
      <Link href='/setting'>
        <Setting color='black' size={28} style={{ cursor: 'pointer' }} />
      </Link>
    </header>
  );
};
