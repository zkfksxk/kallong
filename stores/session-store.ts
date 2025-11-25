import { Session } from '@supabase/supabase-js';
import { createStore } from 'zustand';

export type SessionState = {
  isLoaded: boolean;
  session: Session | null;
};

export type SessionAction = {
  getSession: () => Session | null;
  IsSessionLoaded: () => boolean;
  setSession: (session: Session | null) => void;
  reset: () => void;
};

export type SessionStore = SessionState & SessionAction;

const initialState: SessionState = {
  isLoaded: false,
  session: null,
};

export const createSessionStore = (init: SessionState = initialState) =>
  createStore<SessionStore>()((set, get) => ({
    ...init,
    getSession: () => get().session,
    IsSessionLoaded: () => get().isLoaded,
    setSession: (session) =>
      set(() => ({
        session,
        isLoaded: true,
      })),
    reset: () => set(() => ({ ...initialState })),
  }));
