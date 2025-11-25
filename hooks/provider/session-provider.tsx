'use client';

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useStore } from 'zustand';
import { createSupabaseBrowserClient } from '@/shared/supabase/client';
import { type SessionStore, createSessionStore } from '@/stores/session-store';

export type SessionStoreApi = ReturnType<typeof createSessionStore>;

export const SessionStoreContext = createContext<SessionStoreApi | undefined>(
  undefined
);

export interface SessionStoreProviderProps {
  children: ReactNode;
}

export const SessionStoreProvider = ({
  children,
}: SessionStoreProviderProps) => {
  const storeRef = useRef<SessionStoreApi | null>(null);
  const supabaseRef = useRef(createSupabaseBrowserClient());

  if (storeRef.current === null) {
    storeRef.current = createSessionStore();
  }

  useEffect(() => {
    const supabase = supabaseRef.current;
    const store = storeRef.current!;

    // 초기 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      store.getState().setSession(session);
    });

    // 세션 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      store.getState().setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionStoreContext.Provider value={storeRef.current}>
      {children}
    </SessionStoreContext.Provider>
  );
};

export const useSessionStore = <T,>(
  selector: (store: SessionStore) => T
): T => {
  const ctx = useContext(SessionStoreContext);
  if (!ctx) {
    throw new Error('useSessionStore must be used within SessionStoreProvider');
  }
  return useStore(ctx, selector);
};
