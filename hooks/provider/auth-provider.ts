'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import { getProfile } from '@/apis/actions/auth';
import { createSupabaseBrowserClient } from '@/shared/supabase/client';
import { useProfileStore } from './profile-provider';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const supabaseRef = useRef(createSupabaseBrowserClient());
  const { setProfile, reset } = useProfileStore((s) => s);

  useEffect(() => {
    const supabase = supabaseRef.current;
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user?.id) {
        try {
          const profile = await getProfile(session.user.id);
          setProfile(profile);
        } catch (error) {
          console.error('Failed to load profile:', error);
        }
      } else {
        reset();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user?.id) {
        try {
          const profile = await getProfile(session.user.id);
          setProfile(profile);
        } catch (error) {
          console.error('Failed to load profile:', error);
        }
      } else {
        reset();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setProfile, reset]);

  return children;
}
