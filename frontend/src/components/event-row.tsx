import { EventCard } from "./event-card";

type Props = {
  event: {
    roomingLists: Array<{ bookingsCount: number; cutOffDate: string }>;
    name: string;
  };
};
export const EventRow = ({ event }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className="w-full border-b border-[#00C2A6]"></div>
        <div className="px-8 bg-background w-fit absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div className="border border-[#00C2A6] bg-[#85e7d885] py-1 px-2 w-fit rounded-lg">
            <span className="text-[#00C2A6]">{event?.name}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2">
        {event?.roomingLists.map(({bookingsCount, cutOffDate}, i) => (
          <div key={i} className="flex-shrink-0">
            <EventCard bookingsCount={bookingsCount} cutOffDate={cutOffDate} />
          </div>
        ))}
      </div>
    </div>
  );
};
