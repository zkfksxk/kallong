import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { AUTH_ROUTES, LOGIN_PATH, PROTECTED_ROUTES } from '../common/routes';

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.includes(route));
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.includes(route));
}

export default async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabaseResponse = response;

  // Initialize Supabase server client with custom cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          // Re-create the response with updated cookies
          //supabaseResponse = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Fetch the current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Redirect unauthenticated users to login, except for auth routes
  if (!user && isProtectedRoute(path) && !path.startsWith('/auth')) {
    const url = request.nextUrl.clone();
    const locale = path.split('/')[1];
    url.pathname = `/${locale}${LOGIN_PATH}`;
    url.searchParams.set('next', path);
    return NextResponse.redirect(url);
  }

  // Prevent authenticated users from accessing the login page
  if (user && isAuthRoute(path)) {
    const url = request.nextUrl.clone();
    const locale = path.split('/')[1];
    url.pathname = `/${locale}/`;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
