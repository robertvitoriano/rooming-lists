import { lightenColor } from "@/lib/utils";
import { RoomingListCard } from "./rooming-list-card";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { PopOverWrapper } from "./pop-over-wrapper";
import CutOffDateSort from "./cut-off-date-sort";
import { RoomingList } from "@/api/fetchEvents";
import { useState } from "react";
import { fetchRoomingListsByEvent } from "@/api/fetch-rooming-lists-event";
import { useQuery } from "@tanstack/react-query";

type Props = {
  event: {
    id: string;
    roomingLists: Array<RoomingList>;
    name: string;
  };
  color: string;
};

export const RoomingListRow = ({ event, color }: Props) => {
  const [cutOffDateSort, setCutOffDateSort] = useState<string>("DESC");
  const [enabled, setEnabled] = useState(false); 
  
  const lightColor = lightenColor(color, 0.5);

  const {
    data,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["roomingLists", event.id, cutOffDateSort],
    queryFn: () => fetchRoomingListsByEvent(event.id, cutOffDateSort),
    enabled, 
    refetchOnWindowFocus: false,
  });

  const handleCutOffDateSortSave = async (closeCutOffDateSortSelecion: () => void) => {
    closeCutOffDateSortSelecion();
    setEnabled(true);
    await refetch(); 
  };

  const roomingLists = data?.data ?? event.roomingLists;

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
            setCutOffDateSort={setCutOffDateSort}
            cuttOffSortSelectedValue={cutOffDateSort}
          />
        )}
      >
        <div className="bg-white p-2 w-fit h-fit rounded-xl">
          <CaretSortIcon className="rotate-90 w-6 h-6" style={{ color }} />
        </div>
      </PopOverWrapper>

      <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2">
        {roomingLists.map((roomingList) => (
          <div key={roomingList.id} className="flex-shrink-0">
            <RoomingListCard roomingList={roomingList} />
          </div>
        ))}
        {isFetching && <div className="text-sm text-muted">Loading...</div>}
      </div>
    </div>
  );
};
