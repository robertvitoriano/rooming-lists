import { EventCard } from "./event-card";

type Props = {
  event: {
    roomingLists: Array<{ bookingsCount: number; cutOffDate: string }>;
    name: string;
  };
  color: string;
};
export const EventRow = ({ event, color }: Props) => {
  function lightenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace("#", ""), 16);

    const r = Math.min(255, (num >> 16) + Math.round(255 * percent));
    const g = Math.min(255, ((num >> 8) & 0x00ff) + Math.round(255 * percent));
    const b = Math.min(255, (num & 0x0000ff) + Math.round(255 * percent));

    return `rgb(${r}, ${g}, ${b})`;
  }
  const lightColor = lightenColor(color, 0.25);
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className={`w-full border-b]`}></div>
        <div className="px-8 bg-background w-fit absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div
            className={`border py-1 px-2 w-fit rounded-lg`}
            style={{ borderColor: color, backgroundColor: lightColor}}
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
