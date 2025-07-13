import { lightenColor } from "@/lib/utils";
import { EventCard } from "./event-card";

type Props = {
  event: {
    roomingLists: Array<{ bookingsCount: number; cutOffDate: string }>;
    name: string;
  };
  color: string;
};
export const EventRow = ({ event, color }: Props) => {
  
const lightColor = lightenColor(color, 0.50)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className={`w-full border-[0.5px] border-b]`} style={{borderColor: color}}></div>
        <div className="px-8 bg-background w-fit absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div
            className={`py-1 px-2 w-fit rounded-lg`}
            style={{ backgroundColor: lightColor}}
          >
            <span style={{ color }}>{event?.name}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2">
        {event?.roomingLists.map(({ bookingsCount, cutOffDate }, i) => (
          <div key={i} className="flex-shrink-0">
            <EventCard bookingsCount={bookingsCount} cutOffDate={cutOffDate} />
          </div>
        ))}
      </div>
    </div>
  );
};
