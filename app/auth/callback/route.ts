import { type NextRequest, NextResponse } from 'next/server';
import { type EmailOtpType } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/shared/supabase/sever';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const locale = searchParams.get('locale') ?? 'ko';

  if (!token_hash || !type) {
    return NextResponse.redirect(`${origin}/${locale}/error`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (error) {
    return NextResponse.redirect(`${origin}/${locale}/error`);
  }

  switch (type) {
    case 'email':
      return NextResponse.redirect(`${origin}/${locale}/auth/deeplink?to=/`);
    case 'recovery':
      return NextResponse.redirect(
        `${origin}/${locale}/auth/deeplink?to=/auth/password/update`
      );
    default:
      return NextResponse.redirect(`${origin}/${locale}/error`);
  }
}
