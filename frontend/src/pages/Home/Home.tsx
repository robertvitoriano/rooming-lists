import { Input } from "@/components/ui/input";
import searcIcon from "../../assets/search-icon.png";
import filtersIcon from "../../assets/filters-icon.png";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";

export function Home() {
  const [events, setEvents] = useState([2]);
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col bg-background text-black">
          <span className="text-[32px]">Rooming List Management: Events</span>
        </div>
        <div className="flex gap-4">
          <div className="flex relative border b-border bg-white rounded">
            <img src={searcIcon} />
            <Input placeholder="Search" className="border-none bg-white" />
          </div>

          <div className="flex justify-center items-center border b-border bg-white rounded px-6 gap-2">
            <span>Filters</span>
            <img src={filtersIcon} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 overflow-auto">
          
          {events.map(() => (
              <EventCard/>
          ))}
        </div>
      </div>
    </div>
  );
}
