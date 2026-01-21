'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { type OutfitStore, createOutfitStore } from '@/stores/outfit-store';

export type OutfitStoreApi = ReturnType<typeof createOutfitStore>;

export const OutfitStoreContext = createContext<OutfitStoreApi | undefined>(
  undefined
);

export interface OutfitStoreProviderProps {
  children: ReactNode;
}

export const OutfitStoreProvider = ({ children }: OutfitStoreProviderProps) => {
  const storeRef = useRef<OutfitStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createOutfitStore();
  }

  return (
    <OutfitStoreContext.Provider value={storeRef.current}>
      {children}
    </OutfitStoreContext.Provider>
  );
};

export const useOutfitStore = <T,>(selector: (store: OutfitStore) => T): T => {
  const ctx = useContext(OutfitStoreContext);

  if (!ctx) {
    throw new Error('useOutfitStore must be used within OutfitStoreProvider');
  }

  return useStore(ctx, selector);
};
