import { create } from 'zustand';

export interface ICommonStore {
	isOpenCart: boolean;

	openCart: (isOpen: boolean) => void;
}

export const useCommonStore = create<ICommonStore>()((set) => ({
	isOpenCart: false,

	openCart: (isOpenCart) => set((store) => ({ ...store, isOpenCart })),
}));
