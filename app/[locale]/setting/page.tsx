import { useTranslations } from 'next-intl';
import { SettingItem } from '@/components/setting/setting-item';

export default function SettingPage() {
  const t = useTranslations('Setting');

  return (
    <div className='bg-white dark:bg-black w-full flex flex-col'>
      <SettingItem url='/setting/appinfo' title={t('appinfo')} />
      <SettingItem url='/setting/userinfo' title={t('userinfo')} />
      <SettingItem url='/setting/screen' title={t('screen')} />
    </div>
  );
}
