import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { TabMenu } from '@/components/layouts/tab-menu';
import AuthProvider from '@/hooks/provider/auth-provider';
import { LookbookStoreProvider } from '@/hooks/provider/lookbook-provider';
import { OutfitStoreProvider } from '@/hooks/provider/outfit-provider';
import { ProfileStoreProvider } from '@/hooks/provider/profile-provider';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LookbookStoreProvider>
        <OutfitStoreProvider>
          <ProfileStoreProvider>
            <AuthProvider>
              {children}
              <TabMenu />
            </AuthProvider>
          </ProfileStoreProvider>
        </OutfitStoreProvider>
      </LookbookStoreProvider>
    </NextIntlClientProvider>
  );
}
