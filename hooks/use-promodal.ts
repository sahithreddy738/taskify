import { create } from "zustand";

type ProModalType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void | undefined;
};

export const useProModal = create<ProModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
