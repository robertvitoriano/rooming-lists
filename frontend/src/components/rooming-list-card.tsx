import { TooltipProvider } from "@radix-ui/react-tooltip";
import calendarIcon from "../assets/calendar 2.png";
import viewAgreementIcon from "../assets/view-agreement-icon.png";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { RoomingList } from "@/api/fetchEvents";
import { fetchBookingsByRoomingList } from "@/api/fetch-bookings-by-roomingList";
import { getDayAndMonthFromISOString } from "@/lib/utils";
type Props = {
  roomingList: RoomingList;
};
export const RoomingListCard = ({
  roomingList: { id, bookingsCount, cutOffDate, rfpName, agreementType, startDate, endDate },
}: Props) => {
  const { day: cutOffDay, month: cutOffMonth } = getDayAndMonthFromISOString(cutOffDate);
  const { day: startDateDay, month: startDateMonth } = getDayAndMonthFromISOString(startDate);
  const { year: endDateYear, month: endDateDay } = getDayAndMonthFromISOString(endDate);

  return (
    <div className="bg-white  border-2 b-border rounded-md p-4 md:w-[400px]">
      <div className="flex md:justify-between">
        <div className="flex flex-col">
          <span className="font-bold md:text-2xl">[{rfpName}]</span>
          <span className="md:text-[20px]">
            Agreement: <b>{agreementType}</b>
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="border w-fit rounded-lg ">
            <div className="flex bg-accent-25 rounded-t-lg px-2  py-[2px]  md:px-[10px]">
              <span className="text-accent font-semibold text-sm">{cutOffMonth}</span>
            </div>
            <div className="flex justify-center bg-accent-10 rounded-b-lg">
              <span className="text-accent font-semibold md:text-2xl ">{cutOffDay}</span>
            </div>
          </div>
          <span className="text-muted text-xs">Cut-off Date</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex gap-2">
            <img src={calendarIcon}></img>
            <span className="text-muted text-[10px] md:tex-sm">{startDateMonth} {startDateDay} - {endDateDay}, {endDateYear}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            className="text-white bg-active font-semibold md:w-full"
            onClick={() => fetchBookingsByRoomingList(id)}
          >
            View Bookings ({bookingsCount})
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex justify-center  items-center border-2 border-active p-2 rounded-lg">
                  <img src={viewAgreementIcon} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show Agreement as PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
