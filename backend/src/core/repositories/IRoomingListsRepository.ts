import { RoomingList } from '../entities/rooming-list';
import { PaginationParams } from './pagination-params';

export interface IRoomingListsRepository {
  findManyByEventId(eventId: string, paginationParams:PaginationParams): Promise<{roomingLists:RoomingList[], total:number}>;
  findById(roomingListId: string): unknown;
  create(roomingLit: RoomingList): Promise<void>;
  list(): Promise<RoomingList[]>;
  findManyById(ids: string[]): Promise<RoomingList[]>;
  delete(): Promise<void>;
  update(): Promise<void>;
  deleteAll():Promise<void>

}
