import { Booking } from '../entities/booking';
import { Event } from '../entities/event';
import { RoomingList } from '../entities/rooming-list';
import { RoomingListFilteringOptions } from './IRoomingListsRepository';
import { PaginationParams } from './types';
export interface RoomingListsWithBookings{
  roomingList:RoomingList
  bookings: Booking[]
}
export interface EventWithRoomingLists {
  id: string;
  name: string;
  roomingListsWithBooking: RoomingListsWithBookings[];
}

export interface IEventsRepository {
  findById(eventId: string): Promise<Event | null>;
  create(event: Event): Promise<void>;
  findManyById(ids: string[]): Promise<Event[]>;
  list(): Promise<Event[]>;
  listWithRoomingLists(
    paginationParams: PaginationParams,
    filters?: RoomingListFilteringOptions,
  ): Promise<{
    eventsWithRoomingLists: EventWithRoomingLists[];
    total: number;
  }>;
  deleteAll(): Promise<void>;
}
