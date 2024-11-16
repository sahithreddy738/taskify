import { create } from "zustand";

type MobileNavType={
  isOpen:boolean,
  onOpen:()=>void,
  onClose:()=>void|undefined
}

export const useMobileSideBar = create<MobileNavType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


