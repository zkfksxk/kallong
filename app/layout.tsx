import type { Metadata } from 'next';
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Analytics } from '@vercel/analytics/next';
import { Footer } from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header';
import { LookbookStoreProvider } from '@/hooks/lookbook-provider';
import TanstackQueryProvider from '@/hooks/tanstackquery-provider';
import CLIENT_THEME from '@/shared/common/clientTheme';
import { SITE_CONFIG } from '@/shared/common/constants';
import { THEME } from '@/shared/common/theme';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
    type: 'website',
    images: [
      {
        url: SITE_CONFIG.thumbnail,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.image_alt,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  other: {
    google: 'notranslate',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mergedTheme = {
    ...THEME,
    components: {
      ...THEME.components,
      ...CLIENT_THEME.components,
    },
  };

  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS}`}
          crossOrigin='anonymous'
        ></script>
      </head>
      <body>
        <TanstackQueryProvider>
          <MantineProvider theme={mergedTheme}>
            <Notifications />
            <LookbookStoreProvider>
              <Header />
              {children}
              <Footer />
            </LookbookStoreProvider>
          </MantineProvider>
        </TanstackQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
