import {
  IRoomingListStatus,
} from '../entities/value-objects/rooming-list-status';
import {
  EventWithRoomingLists,
  IEventsRepository,
} from '../repositories/IEventsRepository';

interface FetchEventsWithRoomingListsRequest {
  status?: IRoomingListStatus;
  eventName?:string
}
export interface FetchEventsWithRoomingListsResponse {
  eventsWithRoomingLists: EventWithRoomingLists[];
}

export class FetchEventsWithRoomingListsUseCase {
  constructor(private readonly eventslistRepository: IEventsRepository) {}
  async execute(
    params: FetchEventsWithRoomingListsRequest,
  ): Promise<FetchEventsWithRoomingListsResponse> {
    const {
      status,
      eventName
    } = params
    const eventsWithRoomingLists =
      await this.eventslistRepository.listWithRoomingLists({
        status,
        eventName
      });

    return { eventsWithRoomingLists };
  }
}
