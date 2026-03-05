import { createStore } from 'zustand';
import { Profile } from '@/shared/common/types/types';

export type ProfileState = {
  isLoaded: boolean;
  profile: Profile | null;
};

export type ProfileAction = {
  getProfile: () => Profile | null;
  isProfileLoaded: () => boolean;
  setProfile: (profile: Profile | null) => void;
  reset: () => void;
};

export type ProfileStore = ProfileState & ProfileAction;

const initialState: ProfileState = {
  isLoaded: false,
  profile: null,
};

export const createProfileStore = (init: ProfileState = initialState) =>
  createStore<ProfileStore>()((set, get) => ({
    ...init,
    getProfile: () => get().profile,
    isProfileLoaded: () => get().isLoaded,
    setProfile: (profile) =>
      set(() => ({
        profile,
        isLoaded: true,
      })),
    reset: () => set(() => ({ ...initialState })),
  }));
