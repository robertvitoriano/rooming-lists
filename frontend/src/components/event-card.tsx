import calendarIcon from "../assets/calendar 2.png";
import viewAggreementIcon from "../assets/view-aggrement-icon.png";
import { Button } from "./ui/button";
type Props = {
  bookingsCount: number;
  cutOffDate: string;
};
export const EventCard = ({ bookingsCount, cutOffDate }: Props) => {
 
  const date = new Date(cutOffDate);

  const month = date.toLocaleString("en-US", { month: "short" });

  const day = date.getDate(); 
  
  return (
    <div className="bg-white  border b-border  w-[400px] rounded-md p-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-2xl">[RFP NAME]</span>
          <span className="text-[20px]">
            Agreement: <b>Staff</b>
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="border w-fit rounded-lg ">
            <div className="flex py-[2px] px-[10px] bg-accent-25 rounded-t-lg">
              <span className="text-accent font-semibold text-sm">{month}</span>
            </div>
            <div className="flex justify-center bg-accent-10 rounded-b-lg">
              <span className="text-accent font-semibold text-2xl ">{day}</span>
            </div>
          </div>
          <span className="text-muted">Cut-off Date</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex gap-2">
            <img src={calendarIcon}></img>
            <span className="text-muted tex-sm">Jan 31 - Feb, 2025</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button className="text-white bg-active font-semibold w-full">
            View Bookings ({bookingsCount})
          </Button>
          <div className="flex justify-center  items-center border-2 border-active p-2 rounded-lg">
            <img src={viewAggreementIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};
