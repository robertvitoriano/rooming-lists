import { IRoomingListAgreementType } from '../entities/value-objects/rooming-list-agreement-type';
import { IRoomingListStatus } from '../entities/value-objects/rooming-list-status';
import {
  EventWithRoomingLists,
  IEventsRepository,
} from '../repositories/IEventsRepository';
import { PaginationParams } from '../repositories/types';

interface FetchEventsWithRoomingListsRequest extends PaginationParams {
  status?: IRoomingListStatus;
  rfpName?: string;
  aggrementType?: IRoomingListAgreementType;
  eventName?: string;
}
export interface FetchEventsWithRoomingListsResponse {
  eventsWithRoomingLists: EventWithRoomingLists[];
  total: number;
}

export class FetchEventsWithRoomingListsUseCase {
  constructor(private readonly eventslistRepository: IEventsRepository) {}
  async execute(
    params: FetchEventsWithRoomingListsRequest,
  ): Promise<FetchEventsWithRoomingListsResponse> {
    const { status, eventName, aggrementType, rfpName, page, perPage, sort } =
      params;
    const { eventsWithRoomingLists, total } =
      await this.eventslistRepository.listWithRoomingLists(
        {
          page,
          perPage,
          sort,
        },
        {
          status,
          eventName,
          rfpName,
          aggrementType,
        },
      );

    return { eventsWithRoomingLists, total };
  }
}
