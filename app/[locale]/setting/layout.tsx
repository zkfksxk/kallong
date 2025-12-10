import { Footer } from '@/components/layouts/footer';

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='relative bg-white max-w-[500px] w-full flex flex-col flex-1'>
      {children}
      <Footer />
    </main>
  );
}
