import { create } from 'zustand';

type EventsFilterStore = {
  filteredSearch: string;
  filteredStatus: string[];
  setFilteredSearch: (value: string) => void;
  setFilteredStatus: (status: string[]) => void;
};

export const useEventsFilterStore = create<EventsFilterStore>((set) => ({
  filteredSearch: '',
  filteredStatus: [],
  setFilteredSearch: (value) => set({ filteredSearch: value }),
  setFilteredStatus: (status) => set({ filteredStatus: status }),
}));
