import { Input } from "@/components/ui/input";
import searcIcon from "../../assets/search-icon.png";
import filtersIcon from "../../assets/filters-icon.png";
import { useEffect, useState } from "react";
import { EventRow } from "@/components/event-row";
import { PopOverWrapper } from "@/components/pop-over-wrapper";
import RoomingListsFilter from "@/components/rooming-lists-filter";
import { fetchEvents } from "@/api/api";
import { generateRandomColors } from "@/lib/utils";

export function Home() {
  const [events, setEvents] = useState([]);
  const [colors, setColors] = useState<string[]>([]);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const eventsResponse = await fetchEvents();
    if (eventsResponse?.data) {
      setEvents(eventsResponse.data);
      setColors(generateRandomColors(eventsResponse.data.length));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col bg-background text-black">
          <span className="text-[32px]">Rooming List Management: Events</span>
        </div>
        <div className="flex gap-4">
          <div className="flex relative border b-border bg-white rounded-xl h-fit">
            <img src={searcIcon} />
            <Input placeholder="Search" className="border-none bg-white  rounded-xl" />
          </div>
          <PopOverWrapper content={(close) => <RoomingListsFilter checkedColor={colors[0]} onSave={close} />}>
            <div className="flex justify-center items-center border b-border bg-white rounded px-6 py-2 gap-2">
              <span className="text-black">Filters</span>
              <img src={filtersIcon} />
            </div>
          </PopOverWrapper>
        </div>
      </div>
      {events &&
        events.map((event, index) => (
          <EventRow key={event.id} event={event} color={colors[index]} />
        ))}
    </div>
  );
}
