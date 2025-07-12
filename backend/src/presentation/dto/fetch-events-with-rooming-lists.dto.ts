import { IsOptional, IsIn } from 'class-validator';
import { IRoomingListStatus } from 'src/core/entities/value-objects/rooming-list-status';

export class FetchRoomingListsQueryDto {
  @IsOptional()
  @IsIn(['active', 'closed', 'cancelled'])
  status?: string;
}

export const roomingListsStatusMap = {
  active: "received",
  closed: "completed",
  cancelled: "achived",
};
