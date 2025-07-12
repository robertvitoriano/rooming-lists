import { IsOptional, IsIn } from 'class-validator';

export class FetchRoomingListsQueryDto {
  @IsOptional()
  @IsIn(['active', 'closed', 'cancelled'])
  status?: string;
  @IsOptional()
  eventName?: string
}

export const roomingListsStatusMap = {
  active: "received",
  closed: "completed",
  cancelled: "achived",
};
