import { lightenColor } from "@/lib/utils";
import { RoomingListCard } from "./rooming-list-card";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { PopOverWrapper } from "./pop-over-wrapper";
import CutOffDateSort from "./cut-off-date-sort";
type Props = {
  event: {
    roomingLists: Array<{ bookingsCount: number; cutOffDate: string }>;
    name: string;
  };
  color: string;
};
export const RoomingListRow = ({ event, color }: Props) => {
  const lightColor = lightenColor(color, 0.5);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className={`w-full border-[0.5px] border-b]`} style={{ borderColor: color }}></div>
        <div className=" px-2 md:px-8 bg-background w-fit absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div className={`py-1 px-2 w-fit rounded-lg`} style={{ backgroundColor: lightColor }}>
            <span className="text-sm md:text-lg" style={{ color }}>{event?.name}</span>
          </div>
        </div>
      </div>
      <PopOverWrapper content={(close) => <CutOffDateSort checkedColor={color} onSave={close} />}>
        <div className="bg-white  p-2 w-fit h-fit rounded-xl">
          <CaretSortIcon className="rotate-90 w-6 h-6" style={{ color }} />
        </div>
      </PopOverWrapper>
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2">
        {event?.roomingLists.map(({ bookingsCount, cutOffDate }, i) => (
          <div key={i} className="flex-shrink-0">
            <RoomingListCard bookingsCount={bookingsCount} cutOffDate={cutOffDate} />
          </div>
        ))}
      </div>
    </div>
  );
};
