import { create } from "zustand";

interface State {
    activeId: number;
    setActiveId: (id: string) => void;
}

export const useCategoryStore = create<State>()((set)=> ({
    activeId: 1,
    setActiveId: (activeId: number) => set({activeId})
}));
