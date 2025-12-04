import { IoSettingsOutline as SettingIcon } from 'react-icons/io5';
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
        '
    >
      <Link href='/setting'>
        <SettingIcon color='black' size={32} style={{ cursor: 'pointer' }} />
      </Link>
    </header>
  );
};
