import { Input } from "@/components/ui/input";
import searcIcon from "../../assets/search-icon.png";
import MixerIcon from "../../assets/mixer-icon.svg?react";
import { useEffect, useState } from "react";
import { PopOverWrapper } from "@/components/pop-over-wrapper";
import RoomingListsFilter from "@/components/rooming-lists-filter";
import { generateRandomColors } from "@/lib/utils";
import { RoomingListRow } from "@/components/rooming-list-row";
import { fetchEvents } from "@/api/fetchEvents";
import { Button } from "@/components/ui/button";
import { insertBookingsAndRoomingLists } from "@/api/insert-bookings-and-rooming-lists";

export function Home() {
  const [events, setEvents] = useState([]);
  const [colors, setColors] = useState<string[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<string[]>([]);
  const [filteredSearch, setFilteredSearch] = useState<string>("");
  useEffect(() => {
    loadData();
  }, [filteredSearch, filteredStatus]);

  const loadData = async () => {
    const eventsResponse = await fetchEvents(
      {
        page: 1,
      },
      {
        search: filteredSearch,
        status: filteredStatus,
      }
    );

    if (eventsResponse?.data) {
      setEvents(eventsResponse.data);
      setColors(generateRandomColors(eventsResponse.data.length));
    }
  };

  const handleStatusFilterSave = (closeFilter: () => void) => {
    closeFilter();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col bg-background text-black">
          <span className="text-sm md:text-[32px]">Rooming List Management: Events</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex relative border b-border bg-white rounded-xl h-fit">
            <img src={searcIcon} />
            <Input
              placeholder="Search"
              className="border-none bg-white  rounded-xl"
              value={filteredSearch}
              onChange={(e) => {
                setFilteredSearch(e.target.value);
              }}
            />
          </div>
          <PopOverWrapper
            content={(close) => (
              <RoomingListsFilter
                checkedColor={colors[0]}
                onSave={() => handleStatusFilterSave(close)}
                setFilteredStatus = {setFilteredStatus}
              />
            )}
          >
            <div className="flex justify-center items-center border b-border bg-white rounded px-6 py-2 gap-3">
              <span className="text-black">Filters</span>
              <MixerIcon style={{ color: colors[0], width: "18px", height: "18px" }} />
            </div>
          </PopOverWrapper>
          <Button onClick={insertBookingsAndRoomingLists}>Insert Bookings and Rooming Lists</Button>
        </div>
      </div>
      {events.map((event, index) => (
        <RoomingListRow key={event.id} event={event} color={colors[index]} />
      ))}
    </div>
  );
}
