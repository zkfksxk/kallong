import { useTranslations } from 'next-intl';
import { SettingItem } from '@/components/setting/setting-item';

export default function ScreenPage() {
  const t = useTranslations('Setting');

  return (
    <div className='bg-white w-full flex flex-col'>
      <SettingItem url='/setting/screen/theme' title={t('theme')} />
      <SettingItem url='/setting/screen/language' title={t('lang')} />
    </div>
  );
}
