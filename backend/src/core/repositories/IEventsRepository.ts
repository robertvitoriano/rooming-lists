import { Event } from '../entities/event';
import { RoomingList } from '../entities/rooming-list';
import { IRoomingListStatus } from '../entities/value-objects/rooming-list-status';
import { PaginationParams } from './pagination-params';

export interface EventWithRoomingLists {
  id: string;
  name: string;
  roomingLists: RoomingList[];
}

export type RoomingListFilteringOptions = {
  status?: IRoomingListStatus;
  eventName?: string;
};

export interface IEventsRepository {
  create(event: Event): Promise<void>;
  findManyById(ids: string[]): Promise<Event[]>;
  list(): Promise<Event[]>;
  listWithRoomingLists(
    paginationParams:PaginationParams,
    filters?: RoomingListFilteringOptions,
  ): Promise<{
    eventsWithRoomingLists: EventWithRoomingLists[];
    total: number;
  }>;
}
