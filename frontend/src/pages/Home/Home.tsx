import { fetchEvents } from "@/api/fetchEvents";
import { insertBookingsAndRoomingLists } from "@/api/insert-bookings-and-rooming-lists";
import { PopOverWrapper } from "@/components/pop-over-wrapper";
import { RoomingListRow } from "@/components/rooming-list-row";
import RoomingListsFilter from "@/components/rooming-lists-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateRandomColors } from "@/lib/utils";
import { useRoomingListsFilterStore } from "@/store/useRoomingListFilterStore";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import searchIcon from "./../../assets/search-icon.png";
import MixerIcon from "./../../assets/mixer-3-sliders.svg?react";

export function Home() {
  const { filteredSearch, setFilteredSearch, filteredStatus, setFilteredStatus } =
    useRoomingListsFilterStore();

  const {
    data: eventsData,
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["events", filteredSearch, filteredStatus],
    queryFn: () =>
      fetchEvents({ page: 1 }, { search: filteredSearch, status: filteredStatus, sort: "DESC" }),
  });

  const events = eventsData?.data || [];
  const colors = useMemo(() => generateRandomColors(events.length), [events.length]);

  const handleStatusFilterSave = (closeFilter: () => void) => {
    closeFilter();
  };

  const handleDataSeeding = async () => {
    await insertBookingsAndRoomingLists();
    await refetch();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col bg-background text-black">
          <span className="text-sm md:text-[32px]">Rooming List Management: Events</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex relative border b-border bg-white rounded-xl h-fit">
            <img src={searchIcon} />
            <Input
              placeholder="Search"
              className="border-none bg-white rounded-xl"
              value={filteredSearch}
              onChange={(e) => setFilteredSearch(e.target.value)}
            />
          </div>
          <PopOverWrapper
            content={(close) => (
              <RoomingListsFilter
                checkedColor={colors[0]}
                onSave={() => handleStatusFilterSave(close)}
                setFilteredStatus={setFilteredStatus}
                selectedStatus={filteredStatus}
              />
            )}
          >
            <div className="flex justify-center items-center border b-border bg-white rounded px-6 py-2 gap-3">
              <span className="text-black">Filters</span>
              <MixerIcon style={{ color: colors[0], width: "18px", height: "18px" }} />
            </div>
          </PopOverWrapper>
          <Button onClick={handleDataSeeding}>
            {isFetching ? "Loading..." : "Insert Bookings and Rooming Lists"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <span>Loading events...</span>
      ) : (
        events.map((event, index) => (
          <RoomingListRow key={event.id} event={event} color={colors[index]} />
        ))
      )}
    </div>
  );
}
