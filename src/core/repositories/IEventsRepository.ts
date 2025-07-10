import { Event } from '../entities/event';
import { RoomingList } from '../entities/rooming-list';
import { UniqueId } from '../entities/value-objects/unique-id';

export interface EventWithRoomingLists {
  id: string;
  name: string;
  roomingLists: RoomingList[];
}

export interface IEventsRepository {
  create(event: Event): Promise<void>;
  findManyById(ids: string[]): Promise<Event[]>;
  list(): Promise<Event[]>;
  listWithRoomingLists(): Promise<EventWithRoomingLists[]>;
}
