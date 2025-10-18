import { create } from "zustand";

type AppState = {
  lastUpdated: number | null;
  setLastUpdated: (ts?: number) => void;
};

export const useApp = create<AppState>((set) => ({
  lastUpdated: null,
  setLastUpdated: (ts) => set({ lastUpdated: ts ?? Date.now() }),
}));
