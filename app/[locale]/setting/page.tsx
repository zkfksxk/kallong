import { Divider } from '@mantine/core';
import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { SettingItem } from './_components';

export default function SettingPage() {
  const t = useTranslations('Setting');

  return (
    <div className='bg-white dark:bg-black w-full flex flex-col'>
      <SettingItem url='/setting/appinfo' title={t('appInfo.introduce')} />
      <SettingItem url='/setting/userinfo' title={t('userInfo')} />
      <SettingItem url='/setting/screen' title={t('screen')} />
      <Divider size='xs' className='mb-8' />
      <div className='flex flex-row justify-between'>
        <Text size='md' fw={700}>
          {t('version')}
        </Text>
        <Text size='md' fw={700}>
          1.0.4
        </Text>
      </div>
    </div>
  );
}
