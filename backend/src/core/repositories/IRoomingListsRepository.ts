import { RoomingList } from '../entities/rooming-list';
import { IRoomingListAgreementType } from '../entities/value-objects/rooming-list-agreement-type';
import { PaginationParams } from './types';
export type RoomingListFilteringOptions = {
  status?: string[]
  eventName?: string;
  rfpName?: string;
  agreementType?: IRoomingListAgreementType;
  search?:string
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
