import {
  IRoomingListStatus,
  RoomingListStatus,
} from '../entities/value-objects/rooming-list-status';
import {
  EventWithRoomingLists,
  IEventsRepository,
} from '../repositories/IEventsRepository';

interface FetchEventsWithRoomingListsRequest {
  status?: IRoomingListStatus;
}
export interface FetchEventsWithRoomingListsResponse {
  eventsWithRoomingLists: EventWithRoomingLists[];
}

export class FetchEventsWithRoomingListsUseCase {
  constructor(private readonly eventslistRepository: IEventsRepository) {}
  async execute(
    params: FetchEventsWithRoomingListsRequest,
  ): Promise<FetchEventsWithRoomingListsResponse> {
    const eventsWithRoomingLists =
      await this.eventslistRepository.listWithRoomingLists({
        status: params.status,
      });

    return { eventsWithRoomingLists };
  }
}
