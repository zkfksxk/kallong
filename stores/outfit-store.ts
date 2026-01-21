import { createStore } from 'zustand';
import type { DailyOutfitForm } from '@/shared/common/types';

export type OutfitState = {
  dailyOutfit: DailyOutfitForm | null;
};

export type OutfitAction = {
  getDailyOutfit: () => DailyOutfitForm | null;
  setDailyOutfit: (dailyOutfit: Partial<DailyOutfitForm> | null) => void;
  reset: () => void;
};

export type OutfitStore = OutfitState & OutfitAction;

const initialState: OutfitState = {
  dailyOutfit: null,
};

export const createOutfitStore = (init: OutfitState = initialState) =>
  createStore<OutfitStore>()((set, get) => ({
    ...init,
    getDailyOutfit: () => get().dailyOutfit,
    setDailyOutfit: (payload) =>
      set((state) => ({
        dailyOutfit: payload
          ? { ...(state.dailyOutfit as DailyOutfitForm), ...payload }
          : null,
      })),
    reset: () => set(() => ({ ...initialState })),
  }));
