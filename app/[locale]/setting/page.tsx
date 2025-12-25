import { SettingItem } from '@/components/setting/setting-item';

export default function SettingPage() {
  //const t = useTranslations('Setting');

  return (
    <div className='bg-white w-full flex flex-col'>
      <SettingItem url='/setting/appinfo' title='내일 뭐 입지 소개' />
      <SettingItem url='/setting/userinfo' title='사용자 설정' />
    </div>
  );
}
