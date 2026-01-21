export default function ClosetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='relative bg-white max-w-[500px] w-full flex flex-1 flex-col px-5 pb-20'>
      {children}
    </main>
  );
}
