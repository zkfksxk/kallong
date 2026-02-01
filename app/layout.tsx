import type { Metadata } from 'next';
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from 'next-themes';
import TanstackQueryProvider from '@/hooks/provider/tanstackquery-provider';
import { SITE_CONFIG } from '@/shared/common/constants';
import CLIENT_THEME from '@/shared/theme/clientTheme';
import { THEME } from '@/shared/theme/theme';
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

export default async function RootLayout({
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
    <html lang='ko' {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <TanstackQueryProvider>
          <ThemeProvider
            attribute='class'
            enableSystem={true}
            defaultTheme='system'
          >
            <MantineProvider theme={mergedTheme}>
              <Notifications position='bottom-center' />
              {children}
            </MantineProvider>
          </ThemeProvider>
        </TanstackQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
