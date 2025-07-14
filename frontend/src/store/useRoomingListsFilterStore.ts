import { create } from "zustand";

export type SortOrder = "ASC" | "DESC";

type RoomingListsFilterStore = {

  cutOffDateSortByEventMap: Record<string, SortOrder>;

  setCutOffDateSortForEvent: (eventId: string, sort: SortOrder) => void;
};

export const useRoomingListsFilterStore = create<RoomingListsFilterStore>((set) => ({
  cutOffDateSortByEventMap: {},
  setCutOffDateSortForEvent: (eventId, sort) =>
    set((state) => ({
      cutOffDateSortByEventMap: {
        ...state.cutOffDateSortByEventMap,
        [eventId]: sort,
      },
    })),
}));
