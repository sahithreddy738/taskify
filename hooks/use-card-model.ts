import { create } from "zustand";

type CardModelType = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void | undefined;
};

export const useCardModel = create<CardModelType>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
