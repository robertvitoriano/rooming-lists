import {
  EventWithRoomingLists,
  IEventsRepository,
} from '../repositories/IEventsRepository';

interface FetchEventsWithRoomingListsRequest {}

export interface FetchEventsWithRoomingListsResponse {
  eventsWithRoomingLists: EventWithRoomingLists[];
}

export class FetchEventsWithRoomingListsUseCase {
  constructor(private readonly eventslistRepository: IEventsRepository) {}
  async execute(
    params: FetchEventsWithRoomingListsRequest,
  ): Promise<FetchEventsWithRoomingListsResponse> {
    const eventsWithRoomingLists =
      await this.eventslistRepository.listWithRoomingLists();

    return { eventsWithRoomingLists };
  }
}
