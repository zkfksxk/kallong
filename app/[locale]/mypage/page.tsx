import { LookbookList } from '@/components/mypage/lookbook-list';

export default function MyPage() {
  return (
    <div className='relative bg-white dark:bg-black flex flex-1 flex-col gap-10'>
      <LookbookList />
    </div>
  );
}
