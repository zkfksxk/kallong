import { type NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import updateSession from './shared/supabase/middleware';

const nextIntlMiddleware = createIntlMiddleware(routing);

export async function middleware(req: NextRequest) {
  const intlRes = nextIntlMiddleware(req);
  const res = await updateSession(req, intlRes);

  const token = crypto.randomUUID();
  const anonId = req.cookies.get('anon_id')?.value;

  if (!anonId) {
    res.cookies.set({
      name: 'anon_id',
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, //7일
    });
  }

  const savedLang = req.cookies.get('lang')?.value;
  const currentLocale = req.nextUrl.pathname.split('/')[1];

  if (
    savedLang &&
    (savedLang === 'ko' || savedLang === 'en') &&
    currentLocale !== savedLang
  ) {
    const newPath = req.nextUrl.pathname.replace(
      `/${currentLocale}`,
      `/${savedLang}`
    );

    const redirectRes = NextResponse.redirect(new URL(newPath, req.url));
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie);
    });

    return redirectRes;
  }

  return res;
}

export const config = {
  matcher: ['/', '/(ko|en)/:path*', '/api/:path*'],
};
