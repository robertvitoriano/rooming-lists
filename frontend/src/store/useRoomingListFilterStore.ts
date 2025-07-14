import { create } from 'zustand';

type RoomingListFilterStore = {
  filteredSearch: string;
  filteredStatus: string[];
  setFilteredSearch: (value: string) => void;
  setFilteredStatus: (status: string[]) => void;
};

export const useRoomingListsFilterStore = create<RoomingListFilterStore>((set) => ({
  filteredSearch: '',
  filteredStatus: [],
  setFilteredSearch: (value) => set({ filteredSearch: value }),
  setFilteredStatus: (status) => set({ filteredStatus: status }),
}));
