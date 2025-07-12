import { RoomingList } from '../entities/rooming-list';
import { IRoomingListAgreementType } from '../entities/value-objects/rooming-list-agreement-type';
import { PaginationParams, Sorting } from './types';
export type RoomingListFilteringOptions = {
  status?;
  eventName?: string;
  rfpName?: string;
  aggrementType?: IRoomingListAgreementType;
};
export interface IRoomingListsRepository {
  findManyByEventId(
    eventId: string,
    paginationParams: PaginationParams,
    filters: RoomingListFilteringOptions,
  ): Promise<{ roomingLists: RoomingList[]; total: number }>;
  findById(roomingListId: string): unknown;
  create(roomingLit: RoomingList): Promise<void>;
  list(): Promise<RoomingList[]>;
  findManyById(ids: string[]): Promise<RoomingList[]>;
  delete(): Promise<void>;
  update(): Promise<void>;
  deleteAll(): Promise<void>;
}
