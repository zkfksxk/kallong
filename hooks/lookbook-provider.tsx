'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import {
  type LookbookStore,
  createLookbookStore,
} from '@/stores/lookbook-store';

export type LookbookStoreApi = ReturnType<typeof createLookbookStore>;

export const LookbookStoreContext = createContext<LookbookStoreApi | undefined>(
  undefined
);

export interface LookbookStoreProviderProps {
  children: ReactNode;
}

export const LookbookStoreProvider = ({
  children,
}: LookbookStoreProviderProps) => {
  const storeRef = useRef<LookbookStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createLookbookStore();
  }

  return (
    <LookbookStoreContext.Provider value={storeRef.current}>
      {children}
    </LookbookStoreContext.Provider>
  );
};

export const useLookbookStore = <T,>(
  selector: (store: LookbookStore) => T
): T => {
  const ctx = useContext(LookbookStoreContext);
  if (!ctx) {
    throw new Error(
      'useLookbookStore must be used within LookbookStoreProvider'
    );
  }
  return useStore(ctx, selector);
};
