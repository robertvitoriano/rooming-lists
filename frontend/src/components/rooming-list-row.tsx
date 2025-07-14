import { lightenColor } from "@/lib/utils";
import { RoomingListCard } from "./rooming-list-card";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { PopOverWrapper } from "./pop-over-wrapper";
import CutOffDateSort from "./cut-off-date-sort";
import { RoomingList } from "@/api/fetchEvents";
import { fetchRoomingListsByEvent } from "@/api/fetch-rooming-lists-event";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SortOrder, useRoomingListsFilterStore } from "@/store/useRoomingListsFilterStore";
import { useState, useCallback } from "react";
import { useEventsFilterStore } from "@/store/useEventsFilterStore";
import { Button } from "./ui/button";

type Props = {
  event: {
    id: string;
    roomingLists: Array<RoomingList>;
    name: string;
  };
  color: string;
};

export const RoomingListRow = ({ event, color }: Props) => {
  const [enabled, setEnabled] = useState(false);
  const { setCutOffDateSortForEvent } = useRoomingListsFilterStore();
  const { filteredSearch, filteredStatus } = useEventsFilterStore();
  const cutOffDateSort = useRoomingListsFilterStore(
    (state) => state.cutOffDateSortByEventMap[event.id] || "DESC"
  );
  const lightColor = lightenColor(color, 0.5);

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    enabled,
    refetchOnWindowFocus: false,
    queryKey: ["roomingLists", event.id, cutOffDateSort, filteredSearch, filteredStatus],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchRoomingListsByEvent({
        eventId: event.id,
        cutOffDateSort,
        search: filteredSearch,
        status: filteredStatus,
        page: pageParam,
      });

      return {
        data: response.data,
        message: response.message,
        meta: {
          ...response.meta,
          pagination: {
            currentPage: response.meta?.pagination?.currentPage ?? 1,
            totalPages: response.meta?.pagination?.totalPages ?? 1,
            ...response.meta?.pagination,
          },
        },
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.pagination.currentPage < lastPage.meta.pagination.totalPages
        ? lastPage.meta.pagination.currentPage + 1
        : undefined;
    },
    initialData: () => {
      if (event.roomingLists.length > 0) {
        return {
          pages: [
            {
              data: event.roomingLists,
              meta: {
                pagination: {
                  currentPage: 1,
                  totalPages: 1,
                },
              },
              message: "Initial data",
            },
          ],
          pageParams: [1],
        };
      }
      return undefined;
    },
  });

  const handleCutOffDateSortSave = (close: () => void) => {
    close();
    setEnabled(true);
  };

  const roomingLists = data?.pages.flatMap((page) => page.data) ?? event.roomingLists;

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className={`w-full border-[0.5px]`} style={{ borderColor: color }}></div>
        <div className="px-2 md:px-8 bg-background w-fit absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div className="py-1 px-2 w-fit rounded-lg" style={{ backgroundColor: lightColor }}>
            <span className="text-sm md:text-lg" style={{ color }}>
              {event.name}
            </span>
          </div>
        </div>
      </div>
      <PopOverWrapper
        content={(close) => (
          <CutOffDateSort
            checkedColor={color}
            onSave={() => handleCutOffDateSortSave(close)}
            setCutOffDateSortForEvent={(sort) =>
              setCutOffDateSortForEvent(event.id, sort as SortOrder)
            }
            cuttOffSortSelectedValue={cutOffDateSort}
          />
        )}
      >
        <div className="bg-white p-2 w-fit h-fit rounded-xl">
          <CaretSortIcon className="rotate-90 w-6 h-6" style={{ color }} />
        </div>
      </PopOverWrapper>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2">
          {roomingLists.map((roomingList) => (
            <div key={roomingList.id} className="flex-shrink-0">
              <RoomingListCard roomingList={roomingList} />
            </div>
          ))}
          {(isFetching || isFetchingNextPage) && (
            <div className="text-sm text-muted">Loading...</div>
          )}
        </div>

        {hasNextPage && (
          <Button
            onClick={loadMore}
            disabled={isFetchingNextPage}
            style={{ backgroundColor: lightColor, color }}
            className="self-center"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
};
