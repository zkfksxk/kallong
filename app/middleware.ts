import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { randomUUID } from 'crypto';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const anonId = req.cookies.get('anon_id')?.value;

  if (!anonId) {
    res.cookies.set({
      name: 'anon_id',
      value: randomUUID(),
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
  matcher: ['/lookbooks/result/:path*', '/api/:path*'],
};
