import type { NextRequest } from 'next/server';
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
  return res;
}

export const config = {
  matcher: ['/', '/(ko|en)/:path*', '/api/:path*'],
};
