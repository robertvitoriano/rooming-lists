import { RoomingList } from '../entities/rooming-list';

export interface IRoomingListsRepository {
  findManyByEventId(eventId: string): Promise<RoomingList[]>;
  findById(roomingListId: string): unknown;
  create(roomingLit: RoomingList): Promise<void>;
  list(): Promise<RoomingList[]>;
  findManyById(ids: string[]): Promise<RoomingList[]>;
  delete(): Promise<void>;
  update(): Promise<void>;
}
