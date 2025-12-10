'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import type { ProfileStore } from '@/stores/profile-store';
import { createProfileStore } from '@/stores/profile-store';

export type ProfileStoreApi = ReturnType<typeof createProfileStore>;

export const ProfileStoreContext = createContext<ProfileStoreApi | undefined>(
  undefined
);

export interface ProfileStoreProviderProps {
  children: ReactNode;
}

export const ProfileStoreProvider = ({
  children,
}: ProfileStoreProviderProps) => {
  const storeRef = useRef<ProfileStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createProfileStore();
  }

  return (
    <ProfileStoreContext.Provider value={storeRef.current}>
      {children}
    </ProfileStoreContext.Provider>
  );
};

export const useProfileStore = <T,>(
  selector: (store: ProfileStore) => T
): T => {
  const ctx = useContext(ProfileStoreContext);

  if (!ctx) {
    throw new Error('useProfileStore must be used within ProfileStoreProvider');
  }

  return useStore(ctx, selector);
};
