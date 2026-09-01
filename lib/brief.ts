"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BriefItem = {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
};

type BriefState = {
  items: BriefItem[];
  isOpen: boolean;
  addItem: (item: Omit<BriefItem, "quantity">, quantity?: number) => void;
  removeItem: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clear: () => void;
  openBrief: () => void;
  closeBrief: () => void;
};

export const useBrief = create<BriefState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.id === item.id);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.id === item.id
                  ? { ...entry, quantity: entry.quantity + quantity }
                  : entry,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((entry) => entry.id !== id),
        })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((entry) => entry.id !== id)
              : state.items.map((entry) =>
                  entry.id === id ? { ...entry, quantity } : entry,
                ),
        })),
      clear: () => set({ items: [] }),
      openBrief: () => set({ isOpen: true }),
      closeBrief: () => set({ isOpen: false }),
    }),
    {
      name: "apex-brief",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function briefCount(items: BriefItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function briefTotal(items: BriefItem[]) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
